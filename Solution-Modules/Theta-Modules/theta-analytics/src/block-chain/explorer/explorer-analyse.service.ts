import { RpcService } from './../rpc/rpc.service'
import { BLOCK_COUNT_KEY, TRANSACTION_COUNT_KEY } from './const'
import { CountEntity } from './count.entity'
import { TransactionEntity } from './transaction.entity'
import { BlokcListEntity } from './block-list.entity'
import { UtilsService, writeFailExcuteLog, writeSucessExcuteLog } from 'src/common/utils.service'
import { DataSource, QueryRunner } from 'typeorm'
import { Injectable, Logger } from '@nestjs/common'
import { THETA_BLOCK_INTERFACE } from 'theta-ts-sdk/dist/types/interface'
import BigNumber from 'bignumber.js'
import { THETA_TRANSACTION_TYPE_ENUM } from 'theta-ts-sdk/dist/types/enum'
import { config } from 'src/const'
import { InjectDataSource } from '@nestjs/typeorm'

const path = require('path')
// console.log('get path', path.basename(path.resolve(process.cwd())))

@Injectable()
export class ExplorerAnalyseService {
  private explorerConnectionRunner: QueryRunner
  private readonly logger = new Logger('explorer analyse service')

  private heightConfigFile = config.get('ORM_CONFIG')['database'] + 'explorer/record.height'

  private current: any = {}
  private transactionNum = 0
  // private transactionCountKey
  // utilsService: any

  constructor(
    private utilsService: UtilsService,
    @InjectDataSource('explorer')
    private readonly explorerConnectionInjected: DataSource,
    private rpcService: RpcService
  ) {
    // this.utilsService = utilsService
  }
  public async analyse() {
    try {
      this.explorerConnectionRunner = this.explorerConnectionInjected.createQueryRunner()
      // await this.explorerConnectionInjected.connect()
      await this.explorerConnectionRunner.startTransaction()
      this.transactionNum = 0
      const [startHeight, endHeight] = await this.getInitHeight('explorer')
      if (endHeight == 0) {
        await this.explorerConnectionRunner.commitTransaction()
        await this.explorerConnectionRunner.release()
        return
      }
      this.logger.debug(
        'start analyse data, start height:' + startHeight + ', end height:' + endHeight
      )

      const blockList = await this.rpcService.getBlockSByRange(startHeight, endHeight)
      this.logger.debug('get block list length:' + blockList.length)
      for (const block of blockList) {
        await this.handleData(block)
      }
      const tansactionCountEntity = await this.explorerConnectionRunner.manager.findOne(
        CountEntity,
        {
          where: {
            key: TRANSACTION_COUNT_KEY
          }
        }
      )
      if (tansactionCountEntity) {
        tansactionCountEntity.count += this.transactionNum
        await this.explorerConnectionRunner.manager.save(tansactionCountEntity)
      } else {
        await this.explorerConnectionRunner.manager.insert(CountEntity, {
          key: TRANSACTION_COUNT_KEY,
          count: this.transactionNum
        })
      }
      const blockCountEntity = await this.explorerConnectionRunner.manager.findOne(CountEntity, {
        where: { key: BLOCK_COUNT_KEY }
      })
      if (blockCountEntity) {
        blockCountEntity.count += blockList.length
        await this.explorerConnectionRunner.manager.save(blockCountEntity)
      } else {
        await this.explorerConnectionRunner.manager.insert(CountEntity, {
          key: BLOCK_COUNT_KEY,
          count: blockList.length
        })
      }

      if (blockList.length > 0) {
        this.utilsService.updateRecordHeight(
          this.heightConfigFile,
          Number(blockList[blockList.length - 1].height)
        )
      }
      await this.explorerConnectionRunner.commitTransaction()
      writeSucessExcuteLog(config.get('EXPLORER.MONITOR_PATH'))
    } catch (e) {
      this.logger.error(e)
      console.error(e)
      this.logger.debug(JSON.stringify(this.current))
      await this.explorerConnectionRunner.rollbackTransaction()
      // await this.explorerConnectionRunner.release()
      writeFailExcuteLog(config.get('EXPLORER.MONITOR_PATH'))
      // return
    } finally {
      await this.explorerConnectionRunner.release()
    }
    //  let height: number = 0
  }

  async handleData(block: THETA_BLOCK_INTERFACE) {
    const tfuelBurnt = block.transactions.reduce((acc, cur) => {
      if (cur.raw.fee && cur.raw.fee.tfuelwei)
        return acc + new BigNumber(cur.raw.fee.tfuelwei).dividedBy('1e18').toNumber()
      else return acc
    }, 0)
    this.logger.debug(block.height)

    for (const transaction of block.transactions) {
      //   this.logger.debug(JSON.stringify(transaction))
      this.current = transaction
      let theta = 0,
        thetaFuel = 0,
        from = '',
        to = ''
      switch (transaction.type) {
        case THETA_TRANSACTION_TYPE_ENUM.send:
          if (transaction.raw.inputs.length > 0) {
            theta = transaction.raw.inputs.reduce((curr, item) => {
              return curr + new BigNumber(item.coins.thetawei).dividedBy('1e18').toNumber()
            }, 0)
            thetaFuel = transaction.raw.inputs.reduce((curr, item) => {
              return curr + new BigNumber(item.coins.tfuelwei).dividedBy('1e18').toNumber()
            }, 0)
            from = JSON.stringify(transaction.raw.inputs)
            to = JSON.stringify(transaction.raw.outputs)
          } else {
            theta = new BigNumber(transaction.raw.from.coins.thetawei).dividedBy('1e18').toNumber()
            thetaFuel = new BigNumber(transaction.raw.from.coins.tfuelwei)
              .dividedBy('1e18')
              .toNumber()
            from = JSON.stringify([transaction.raw.from])
            to = JSON.stringify([transaction.raw.to])
          }
          break
        case THETA_TRANSACTION_TYPE_ENUM.smart_contract:
          from = transaction.raw.from.address
          to = transaction.raw.to.address
          break
        case THETA_TRANSACTION_TYPE_ENUM.coinbase:
          from = transaction.raw.proposer.address
          to = JSON.stringify(transaction.raw.outputs)
          break
        case THETA_TRANSACTION_TYPE_ENUM.service_payment:
          from = transaction.raw.source.address
          //@ts-ignore
          to = transaction.raw.target.address
          break
        case THETA_TRANSACTION_TYPE_ENUM.reserve_fund:
          from = transaction.raw.source.address
          break
        case THETA_TRANSACTION_TYPE_ENUM.split_rule:
          //@ts-ignore
          from = transaction.raw.initiator.address
          break
        //@ts-ignore
        case 11:
          //@ts-ignore
          from = transaction.raw.holder.address
          break
        // to =
        default:
          if (transaction.raw.from) from = transaction.raw.from.address
          else {
            from = transaction.raw.source.address
          }
          break
      }
      const gasPrice = transaction.raw.gas_price
      const gasLimit = transaction.raw.gas_limit
      if (config.get('CONFLICT_TRANSACTIONS').indexOf(transaction.hash) !== -1) {
        continue
      } else {
        await this.explorerConnectionRunner.manager.insert(TransactionEntity, {
          tx_hash: transaction.hash,
          height: Number(block.height),
          fee: JSON.stringify(transaction.raw.fee),
          tx_type: transaction.type,
          from: from,
          to: to,
          timestamp: Number(block.timestamp),
          theta: theta,
          theta_fuel: thetaFuel,
          gas_price: gasPrice,
          gas_limit: gasLimit
        })
      }
    }
    this.transactionNum += block.transactions.length
    return await this.explorerConnectionRunner.manager.insert(BlokcListEntity, {
      height: Number(block.height),
      block_hash: block.hash,
      timestamp: Number(block.timestamp),
      tfuel_burnt: tfuelBurnt,
      txns: block.transactions.length
    })
  }

  async getInitHeight(configPath: string): Promise<[number, number]> {
    let height: number = 0
    this.logger.debug(this.heightConfigFile)
    const lastfinalizedHeight = Number(
      (await this.rpcService.getStatus()).latest_finalized_block_height
    )
    this.logger.debug(JSON.stringify(config.get(configPath.toUpperCase() + '.START_HEIGHT')))
    // height = lastfinalizedHeight - 1000
    if (config.get(configPath.toUpperCase() + '.START_HEIGHT')) {
      height = config.get(configPath.toUpperCase() + '.START_HEIGHT')
    }
    const recordHeight = this.utilsService.getRecordHeight(this.heightConfigFile)
    height = recordHeight > height ? recordHeight : height

    if (height >= lastfinalizedHeight) {
      this.logger.debug('commit success')
      this.logger.debug('no height to analyse')
      return [0, 0]
    }
    // await this.
    let endHeight = lastfinalizedHeight
    const analyseNumber = config.get(configPath.toUpperCase() + '.ANALYSE_NUMBER')
    if (lastfinalizedHeight - height > analyseNumber) {
      endHeight = height + analyseNumber
    }
    return [height, endHeight]
  }
}
