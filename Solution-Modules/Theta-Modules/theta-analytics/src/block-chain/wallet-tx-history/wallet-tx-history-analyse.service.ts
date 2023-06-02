import { TransactionEntity } from './../explorer/transaction.entity'
import { Injectable, Logger } from '@nestjs/common'
import { UtilsService, writeFailExcuteLog, writeSucessExcuteLog } from 'src/common/utils.service'
import { DataSource, MoreThan, QueryRunner } from 'typeorm'
import { THETA_TRANSACTION_TYPE_ENUM } from '../tx/theta.enum'
import { WalletTxHistoryEntity } from './wallet-tx-history.entity'
import { config } from 'src/const'
import { InjectDataSource } from '@nestjs/typeorm'
const fs = require('fs')
@Injectable()
export class WalletTxHistoryAnalyseService {
  private readonly logger = new Logger('wallet tx history analyse service')
  private walletConnectionRunner: QueryRunner
  private explorerConnectionRunner: QueryRunner
  private walletTxHistoryConnectionRunner: QueryRunner
  private heightConfigFile =
    config.get('ORM_CONFIG')['database'] + 'wallet-tx-history/record.height'

  constructor(
    private utilsService: UtilsService,
    @InjectDataSource('wallet') private walletConnectionInjected: DataSource,
    @InjectDataSource('explorer') private explorerConnectionInjected: DataSource,
    @InjectDataSource('wallet-tx-history') private walletTxHistoryConnectionInjected: DataSource
  ) {}

  public async analyseData() {
    try {
      // console.log(config.get('NFT_STATISTICS.ANALYSE_NUMBER'))
      this.logger.debug('start analyse')
      this.walletConnectionRunner = this.walletConnectionInjected.createQueryRunner()
      this.explorerConnectionRunner = this.explorerConnectionInjected.createQueryRunner()
      this.walletTxHistoryConnectionRunner =
        this.walletTxHistoryConnectionInjected.createQueryRunner()

      await this.walletTxHistoryConnectionRunner.startTransaction()
      let startId: number = 0
      if (!fs.existsSync(this.heightConfigFile)) {
        fs.writeFileSync(this.heightConfigFile, '0')
      } else {
        const data = fs.readFileSync(this.heightConfigFile, 'utf8')
        if (data) {
          startId = Number(data)
        }
      }
      const txRecords = await this.explorerConnectionRunner.manager.find(TransactionEntity, {
        where: {
          id: MoreThan(startId)
        },
        take: config.get('WALLET_TX_HISTORY.ANALYSE_NUMBER'),
        order: { id: 'ASC' }
      })
      const walletToUpdates: { [index: string]: Array<string> } = {}
      this.logger.debug('tx records: ' + txRecords.length)
      for (const record of txRecords) {
        await this.addWallet(record, walletToUpdates)
      }
      this.logger.debug('add wallet end')
      await this.updateWalletTxHistory(walletToUpdates)
      this.logger.debug('update wallet end')
      // await this.downloadAllImg()
      await this.walletTxHistoryConnectionRunner.commitTransaction()

      // try {
      if (txRecords.length > 0) {
        this.logger.debug('end height:' + Number(txRecords[txRecords.length - 1].height))
        this.utilsService.updateRecordHeight(
          this.heightConfigFile,
          txRecords[txRecords.length - 1].id
        )
      }
    } catch (e) {
      console.error(e.message)
      this.logger.error(e.message)
      this.logger.error('rollback')
      await this.walletTxHistoryConnectionRunner.rollbackTransaction()
      writeFailExcuteLog(config.get('WALLET_TX_HISTORY.MONITOR_PATH'))
    } finally {
      await this.walletTxHistoryConnectionRunner.release()
      this.logger.debug('end analyse')
      this.logger.debug('release success')
      writeSucessExcuteLog(config.get('WALLET_TX_HISTORY.MONITOR_PATH'))
    }
  }

  async addWallet(record: TransactionEntity, walletsToupdate: { [index: string]: Array<string> }) {
    if (
      record.tx_type === THETA_TRANSACTION_TYPE_ENUM.send ||
      record.tx_type === THETA_TRANSACTION_TYPE_ENUM.coinbase
    ) {
      // console.log('send record')
      let from = []
      let to = []
      if (record.from && record.tx_type == THETA_TRANSACTION_TYPE_ENUM.send) {
        from = JSON.parse(record.from)
      }
      if (record.from && record.tx_type == THETA_TRANSACTION_TYPE_ENUM.coinbase) {
        from = [record.from]
      }
      // JSON.parse(record.from)
      if (record.to) {
        to = JSON.parse(record.to)
      }
      // console.log('send record parsed')
      for (const addr of [...from, ...to]) {
        if (addr.address === '0x0000000000000000000000000000000000000000') continue
        if (!walletsToupdate[addr.address]) {
          walletsToupdate[addr.address] = []
        }
        const id36 = record.id.toString(36) + record.tx_type.toString(36)
        !walletsToupdate[addr.address].includes(id36) && walletsToupdate[addr.address].push(id36)
      }
    } else {
      if (record.from && record.from != '0x0000000000000000000000000000000000000000') {
        if (!walletsToupdate[record.from]) {
          walletsToupdate[record.from] = []
        }
        const id36 = record.id.toString(36) + record.tx_type.toString(36)

        walletsToupdate[record.from].push(id36)
      }
      if (record.to && record.to != '0x0000000000000000000000000000000000000000') {
        if (!walletsToupdate[record.to]) {
          walletsToupdate[record.to] = []
        }
        // walletsToupdate[record.to].push(record.id + '_' + record.tx_type)
        const id36 = record.id.toString(36) + record.tx_type.toString(36)
        walletsToupdate[record.to].push(id36)
      }
    }
  }

  async updateWalletTxHistory(walletsToupdate: { [index: string]: Array<string> }) {
    const wallets = Object.keys(walletsToupdate)
    for (const wallet of wallets) {
      const tx = await this.walletTxHistoryConnectionRunner.manager.findOne(WalletTxHistoryEntity, {
        where: { wallet: wallet }
      })
      if (tx) {
        tx.tx_ids = JSON.stringify([
          ...new Set([...JSON.parse(tx.tx_ids), ...walletsToupdate[wallet]])
        ])
        await this.walletTxHistoryConnectionRunner.manager.save(tx)
      } else {
        const newTx = new WalletTxHistoryEntity()
        newTx.wallet = wallet
        newTx.tx_ids = JSON.stringify(walletsToupdate[wallet])
        await this.walletTxHistoryConnectionRunner.manager.save(newTx)
      }
    }
  }
}
