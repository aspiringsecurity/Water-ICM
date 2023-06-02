import { WalletDpWdHistoryEntity } from './deposit-withdraw/wallet-dp-wd-history.entity'
import { WalletSendHistoryEntity } from './send/wallet-send-history.entity'
import { NftTransferRecordEntity } from 'src/block-chain/smart-contract/nft/nft-transfer-record.entity'
import { StakeRewardEntity } from './../stake/stake-reward.entity'
import { THETA_TRANSACTION_TYPE_ENUM } from './../tx/theta.enum'
import { TransactionEntity } from './../explorer/transaction.entity'
import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, In, Repository } from 'typeorm'
import { WalletTxHistoryEntity } from './wallet-tx-history.entity'

@Injectable()
export class WalletTxHistoryService {
  private readonly logger = new Logger('wallet tx history  service')
  constructor(
    @InjectRepository(WalletTxHistoryEntity, 'wallet-tx-history')
    private readonly walletTxHistoryRepository: Repository<WalletTxHistoryEntity>,

    @InjectRepository(TransactionEntity, 'explorer')
    private readonly transactionRepository: Repository<TransactionEntity>,

    @InjectRepository(StakeRewardEntity, 'stake')
    private readonly stakeRewardRepository: Repository<StakeRewardEntity>,

    @InjectRepository(NftTransferRecordEntity, 'nft')
    private readonly nftTransferRecordRepository: Repository<NftTransferRecordEntity>,

    @InjectRepository(WalletSendHistoryEntity, 'wallet-send-history')
    private readonly walletSendHistoryRepository: Repository<WalletSendHistoryEntity>,

    @InjectRepository(WalletDpWdHistoryEntity, 'wallet-dp-wd-history')
    private readonly walletDpWdHistoryRepository: Repository<WalletDpWdHistoryEntity>
  ) {}

  async getTransactions(
    wallet: string,
    take: number = 10,
    skip: number = 0,
    txType: THETA_TRANSACTION_TYPE_ENUM | undefined
  ): Promise<[boolean, number, TransactionEntity[]]> {
    const res = await this.walletTxHistoryRepository.findOne({
      where: { wallet: wallet }
    })
    if (!res) {
      return [false, 0, []]
    }
    const txs: Array<string> = JSON.parse(res.tx_ids)
    // if(t)
    if (txs.length === 0) {
      return [false, 0, []]
    }

    // if (txs.length  take) {
    const idsTyped = []
    for (let i = 0; i < txs.length; i++) {
      if (txType == undefined || parseInt(txs[i].substring(txs[i].length - 1), 36) == txType) {
        idsTyped.push(parseInt(txs[i].substring(0, txs[i].length - 1), 36))
      }
    }

    if (skip > idsTyped.length) {
      return [false, 0, []]
    }
    const hasNextPage = idsTyped.length > skip + take ? true : false

    let idsToFind = []
    if (skip == 0) {
      idsToFind = idsTyped.slice(-take)
    } else {
      idsToFind = idsTyped.slice(-skip - take, -skip)
    }
    const list = await this.transactionRepository.find({
      where: { id: In(idsToFind) },
      order: { height: 'DESC' }
    })
    return [hasNextPage, idsTyped.length, list]
    // }
  }

  async getActivityHistory(
    type: 'stake_rewards' | 'nft_transfers' | 'send_transfers' | 'deposit_withdraw',
    wallet: string,
    startTime: number,
    endTime: number
  ): Promise<any> {
    this.logger.debug('get activity ' + type)
    switch (type) {
      case 'stake_rewards':
        return await this.stakeRewardRepository.find({
          where: { timestamp: Between(startTime, endTime), wallet_address: wallet },
          order: { timestamp: 'DESC' }
        })

      case 'nft_transfers':
        return await this.nftTransferRecordRepository.find({
          where: [
            { timestamp: Between(startTime, endTime), from: wallet },
            { timestamp: Between(startTime, endTime), to: wallet }
          ],
          order: { timestamp: 'DESC' }
        })

      case 'send_transfers':
        return await this.walletSendHistoryRepository.find({
          where: [
            { from: wallet, timestamp: Between(startTime, endTime) },
            { to: wallet, timestamp: Between(startTime, endTime) }
          ],
          order: { timestamp: 'DESC' }
        })

      case 'deposit_withdraw':
        return await this.walletDpWdHistoryRepository.find({
          where: { wallet_address: wallet, timestamp: Between(startTime, endTime) },
          order: { timestamp: 'DESC' }
        })
      default:
        return null
    }
  }
}
