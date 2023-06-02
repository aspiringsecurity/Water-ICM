import { WalletDpWdHistoryEntity } from './wallet-dp-wd-history.entity'
import { THETA_TRANSACTION_TYPE_ENUM } from 'theta-ts-sdk/dist/types/enum'
import { THETA_BLOCK_INTERFACE } from 'theta-ts-sdk/dist/types/interface'
import { ForbiddenException, Injectable, Logger } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { UtilsService, writeFailExcuteLog, writeSucessExcuteLog } from 'src/common/utils.service'
import { DataSource, QueryRunner } from 'typeorm'
import { RpcService } from 'src/block-chain/rpc/rpc.service'
import BigNumber from 'bignumber.js'
import { STAKE_NODE_TYPE_ENUM } from 'src/block-chain/stake/stake.model'
import { config } from 'src/const'

@Injectable()
export class WalletDpWdHistoryAnalyseService {
  private readonly logger = new Logger('deposit withdraw history analyse service')
  private recordLogFile = config.get('ORM_CONFIG')['database'] + 'wallet-dp-wd-history/record.log'
  private runner: QueryRunner
  private stakeRunner: QueryRunner
  constructor(
    private utilsService: UtilsService,

    @InjectDataSource('wallet-dp-wd-history')
    private readonly connection: DataSource,

    private rpcService: RpcService
  ) {}

  public async analyse() {
    try {
      this.logger.debug('start analyse')
      this.runner = this.connection.createQueryRunner()
      // this.stakeRunner = this.stakeConnection.createQueryRunner()
      await this.runner.startTransaction()
      const [startHeight, endHeight] = await this.utilsService.getHeightRangeToAnalyse(
        'WALLET_SEND_HISTORY',
        this.recordLogFile
      )
      if (endHeight == 0) {
        this.logger.debug('commit success')
        this.logger.debug('no height to analyse')
        return await this.runner.commitTransaction()
      }

      const blockList = await this.rpcService.getBlockSByRange(startHeight, endHeight)
      for (const block of blockList) {
        await this.analyseBlock(block)
      }
      if (blockList.length > 0) {
        this.utilsService.updateRecordHeight(
          this.recordLogFile,
          Number(blockList[blockList.length - 1].height)
        )
      }
      await this.runner.commitTransaction()
      writeSucessExcuteLog(config.get('WALLET_DP_WD_HISTORY.MONITOR_PATH'))
      this.logger.debug('end analyse')
    } catch (e) {
      this.logger.error(e)
      console.error(e)
      await this.runner.rollbackTransaction()
      writeFailExcuteLog(config.get('WALLET_DP_WD_HISTORY.MONITOR_PATH'))
      // await this.runner.release()
    } finally {
      await this.runner.release()
    }
  }

  private async analyseBlock(block: THETA_BLOCK_INTERFACE) {
    for (const tx of block.transactions) {
      let thetaAmount = 0
      let tfuelAmount = 0
      switch (tx.type) {
        case THETA_TRANSACTION_TYPE_ENUM.withdraw_stake:
          // let walletAddress = tx.raw.source.address
          // let nodeAddress = tx.raw.holder.address
          // const stakeInfo = await

          if (tx.raw.purpose == STAKE_NODE_TYPE_ENUM.validator) {
            const vcp = await this.rpcService.getVcpByHeight(Number(block.height))
            if (vcp && vcp.BlockHashVcpPairs) {
              // throw new BadGatewayException(
              //   block.height + ' can not find  vcp block hash vcp pairs'
              // )
              // if()
              for (const vcpPair of vcp.BlockHashVcpPairs) {
                for (const vcpNode of vcpPair.Vcp.SortedCandidates) {
                  if (
                    vcpNode.Holder.toLocaleLowerCase() == tx.raw.holder.address.toLocaleLowerCase()
                  ) {
                    for (const stake of vcpNode.Stakes) {
                      if (
                        stake.source.toLocaleLowerCase() ==
                        tx.raw.source.address.toLocaleLowerCase()
                      ) {
                        thetaAmount = new BigNumber(stake.amount).dividedBy('1e18').toNumber()
                      }
                    }
                  }
                }
              }
            }
          } else if (tx.raw.purpose == STAKE_NODE_TYPE_ENUM.guardian) {
            const gcp = await this.rpcService.getGcpByHeight(Number(block.height))
            if (gcp && gcp.BlockHashGcpPairs) {
              for (const gcpPair of gcp.BlockHashGcpPairs) {
                for (const gcpNode of gcpPair.Gcp.SortedGuardians) {
                  if (
                    gcpNode.Holder.toLocaleLowerCase() == tx.raw.holder.address.toLocaleLowerCase()
                  ) {
                    for (const stake of gcpNode.Stakes) {
                      if (
                        stake.source.toLocaleLowerCase() ==
                        tx.raw.source.address.toLocaleLowerCase()
                      ) {
                        thetaAmount = new BigNumber(stake.amount).dividedBy('1e18').toNumber()
                      }
                    }
                  }
                }
              }
            }
          } else if (tx.raw.purpose == STAKE_NODE_TYPE_ENUM.edge_cache) {
            const ecp = await this.rpcService.getEenpByHeight(Number(block.height))
            if (ecp && ecp.BlockHashEenpPairs) {
              for (const ecpPair of ecp.BlockHashEenpPairs) {
                for (const ecpNode of ecpPair.EENs) {
                  if (
                    ecpNode.Holder.toLocaleLowerCase() == tx.raw.holder.address.toLocaleLowerCase()
                  ) {
                    for (const stake of ecpNode.Stakes) {
                      if (
                        stake.source.toLocaleLowerCase() ==
                        tx.raw.source.address.toLocaleLowerCase()
                      ) {
                        tfuelAmount = new BigNumber(stake.amount).dividedBy('1e18').toNumber()
                      }
                    }
                  }
                }
              }
            }
          } else {
            throw new ForbiddenException(tx.hash + ' unkown withdraw purpose')
          }
          const history = await this.runner.manager.findOne(WalletDpWdHistoryEntity, {
            where: {
              wallet_address: tx.raw.source.address.toLocaleLowerCase(),
              node_address: tx.raw.holder.address.toLocaleLowerCase(),
              height: Number(block.height)
            }
          })
          if (!history)
            await this.runner.manager.insert(WalletDpWdHistoryEntity, {
              wallet_address: tx.raw.source.address.toLocaleLowerCase(),
              node_address: tx.raw.holder.address.toLocaleLowerCase(),
              height: Number(block.height),
              theta: thetaAmount,
              tfuel: tfuelAmount,
              tx_type: tx.type,
              tx_hash: tx.hash,
              node_type: tx.raw.purpose,
              timestamp: Number(block.timestamp)
            })
          break
        case THETA_TRANSACTION_TYPE_ENUM.deposit_stake:
        case THETA_TRANSACTION_TYPE_ENUM.tx_deposit_stake_v2:
          if (tx.raw.purpose == STAKE_NODE_TYPE_ENUM.validator) {
            thetaAmount = new BigNumber(tx.raw.source.coins.thetawei).dividedBy('1e18').toNumber()
          } else if (tx.raw.purpose == STAKE_NODE_TYPE_ENUM.edge_cache) {
            tfuelAmount = new BigNumber(tx.raw.source.coins.tfuelwei).dividedBy('1e18').toNumber()
          } else if (tx.raw.purpose == STAKE_NODE_TYPE_ENUM.guardian) {
            thetaAmount = new BigNumber(tx.raw.source.coins.thetawei).dividedBy('1e18').toNumber()
          } else {
            throw new ForbiddenException(tx.hash + ' unkown deposit purpose')
          }
          const dpHistory = await this.runner.manager.findOne(WalletDpWdHistoryEntity, {
            where: {
              wallet_address: tx.raw.source.address.toLocaleLowerCase(),
              node_address: tx.raw.holder.address.toLocaleLowerCase(),
              height: Number(block.height)
            }
          })
          if (!dpHistory) {
            await this.runner.manager.insert(WalletDpWdHistoryEntity, {
              wallet_address: tx.raw.source.address.toLocaleLowerCase(),
              node_address: tx.raw.holder.address.toLocaleLowerCase(),
              height: Number(block.height),
              theta: thetaAmount,
              tfuel: tfuelAmount,
              tx_type: tx.type,
              node_type: tx.raw.purpose,
              tx_hash: tx.hash,
              timestamp: Number(block.timestamp)
            })
          }
          break
        default:
          break
      }
    }
  }
}
