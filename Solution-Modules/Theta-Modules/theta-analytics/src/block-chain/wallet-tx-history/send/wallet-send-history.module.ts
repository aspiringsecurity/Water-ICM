import { CommonModule } from 'src/common/common.module'
import { WalletSendHistoryAnalyseService } from './wallet-send-history-analyse.service'
import { WalletSendHistoryEntity } from './wallet-send-history.entity'
import { RpcModule } from '../../rpc/rpc.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    RpcModule,
    CommonModule,
    TypeOrmModule.forFeature([WalletSendHistoryEntity], 'wallet-send-history')
  ],
  controllers: [],
  providers: [WalletSendHistoryAnalyseService],
  exports: []
})
export class WalletSendHistoryModule {}
