import { THETA_TRANSACTION_TYPE_ENUM } from 'theta-ts-sdk/dist/types/enum'
import { THETA_BLOCK_INTERFACE } from 'theta-ts-sdk/dist/types/interface'
import { Injectable, Logger } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { UtilsService, writeFailExcuteLog, writeSucessExcuteLog } from 'src/common/utils.service'
import { DataSource, QueryRunner } from 'typeorm'
import { RpcService } from 'src/block-chain/rpc/rpc.service'
import BigNumber from 'bignumber.js'
import { WalletSendHistoryEntity } from './wallet-send-history.entity'
import { config } from 'src/const'

@Injectable()
export class WalletSendHistoryAnalyseService {
  private readonly logger = new Logger('send history analyse service')
  private recordLogFile = config.get('ORM_CONFIG')['database'] + 'wallet-send-history/record.log'
  private runner: QueryRunner
  constructor(
    private utilsService: UtilsService,

    @InjectDataSource('wallet-send-history')
    private readonly connection: DataSource,
    private rpcService: RpcService
  ) {}

  public async analyse() {
    try {
      this.logger.debug('start analyse')
      this.runner = this.connection.createQueryRunner()
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
      this.logger.debug('get block length:' + blockList.length)
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
      writeSucessExcuteLog(config.get('WALLET_SEND_HISTORY.MONITOR_PATH'))
      this.logger.debug('end analyse')
    } catch (e) {
      this.logger.error(e)
      console.error(e)
      await this.runner.rollbackTransaction()
      writeFailExcuteLog(config.get('WALLET_SEND_HISTORY.MONITOR_PATH'))
      // await this.runner.release()
    } finally {
      await this.runner.release()
    }
  }

  private async analyseBlock(block: THETA_BLOCK_INTERFACE) {
    for (const tx of block.transactions) {
      switch (tx.type) {
        case THETA_TRANSACTION_TYPE_ENUM.send:
          // this.logger.debug(1)
          if (tx.raw.inputs.length > 0) {
            this.logger.debug('analyse ' + tx.hash + ' txs:' + tx.raw.inputs.length)
            for (let i = 0; i < tx.raw.inputs.length; i++) {
              const theta = new BigNumber(tx.raw.inputs[i].coins.thetawei)
                .dividedBy('1e18')
                .toNumber()
              const tfuel = new BigNumber(tx.raw.inputs[i].coins.tfuelwei)
                .dividedBy('1e18')
                .toNumber()
              const from = tx.raw.inputs[i].address.toLocaleLowerCase()
              if (!tx.raw.outputs[i]) continue
              const to = tx.raw.outputs[i].address.toLocaleLowerCase()
              const txHash = tx.hash
              const record = await this.runner.manager.findOne(WalletSendHistoryEntity, {
                where: {
                  from: from,
                  to: to,
                  tx_hash: txHash
                }
              })
              if (record) {
                continue
              }
              await this.runner.manager.insert(WalletSendHistoryEntity, {
                from: from,
                to: to,
                tx_hash: txHash,
                theta: theta,
                tfuel: tfuel,
                timestamp: Number(block.timestamp)
              })
            }
          } else {
            const theta = new BigNumber(tx.raw.from.coins.thetawei).dividedBy('1e18').toNumber()
            const thetaFuel = new BigNumber(tx.raw.from.coins.tfuelwei).dividedBy('1e18').toNumber()
            const record = await this.runner.manager.findOne(WalletSendHistoryEntity, {
              where: {
                from: tx.raw.from.address.toLocaleLowerCase(),
                to: tx.raw.to.address.toLocaleLowerCase(),
                tx_hash: tx.hash
              }
            })
            if (record) {
              continue
            }
            await this.runner.manager.insert(WalletSendHistoryEntity, {
              from: tx.raw.from.address.toLocaleLowerCase(),
              to: tx.raw.to.address.toLocaleLowerCase(),
              tx_hash: tx.hash,
              theta: theta,
              tfuel: thetaFuel,
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
