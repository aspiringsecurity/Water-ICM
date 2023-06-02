import { NftTransferRecordEntity } from './../smart-contract/nft/nft-transfer-record.entity'
import { StakeRewardEntity } from './../stake/stake-reward.entity'
import { WalletTxHistoryResolver } from './wallet-tx-history.resolver'
import { WalletTxHistoryService } from './wallet-tx-history.service'
import { CommonModule } from './../../common/common.module'
import { WalletTxHistoryAnalyseService } from './wallet-tx-history-analyse.service'
import { WalletTxHistoryEntity } from './wallet-tx-history.entity'
import { TransactionEntity } from './../explorer/transaction.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WalletEntity } from '../wallet/wallet.entity'
import { WalletSendHistoryEntity } from './send/wallet-send-history.entity'
import { WalletDpWdHistoryEntity } from './deposit-withdraw/wallet-dp-wd-history.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletEntity], 'wallet'),
    TypeOrmModule.forFeature([TransactionEntity], 'explorer'),
    TypeOrmModule.forFeature([WalletTxHistoryEntity], 'wallet-tx-history'),
    TypeOrmModule.forFeature([StakeRewardEntity], 'stake'),
    TypeOrmModule.forFeature([NftTransferRecordEntity], 'nft'),
    TypeOrmModule.forFeature([WalletSendHistoryEntity], 'wallet-send-history'),
    TypeOrmModule.forFeature([WalletDpWdHistoryEntity], 'wallet-dp-wd-history'),
    CommonModule
  ],
  providers: [WalletTxHistoryAnalyseService, WalletTxHistoryService, WalletTxHistoryResolver],
  exports: []
})
export class WalletTxHistoryModule {}
