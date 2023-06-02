import { CommonModule } from 'src/common/common.module'
import { WalletDpWdHistoryAnalyseService } from './wallet-dp-wd-history-analyse.service'
import { WalletDpWdHistoryEntity } from './wallet-dp-wd-history.entity'
import { RpcModule } from './../../rpc/rpc.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    RpcModule,
    CommonModule,
    TypeOrmModule.forFeature([WalletDpWdHistoryEntity], 'wallet-dp-wd-history')
  ],
  controllers: [],
  providers: [WalletDpWdHistoryAnalyseService],
  exports: []
})
export class WalletDpWdHistoryModule {}
