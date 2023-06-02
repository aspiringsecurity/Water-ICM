import { RpcModule } from './../rpc/rpc.module'
import { Module, CacheModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ThetaTxNumByHoursEntity } from './theta-tx-num-by-hours.entity'
import { TxService } from './tx.service'
import { TxResolver } from './tx.resolver'
import { WalletModule } from '../wallet/wallet.module'
import { TxAnalyseService } from './tx-analyse.service'
import { CommonModule } from 'src/common/common.module'
// import { CacheModule, Module } from '@nestjs/common'

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([ThetaTxNumByHoursEntity], 'tx'),
    WalletModule,
    CommonModule,
    RpcModule
  ],
  providers: [TxService, TxResolver, TxAnalyseService],
  exports: [TxService]
})
export class TxModule {}
