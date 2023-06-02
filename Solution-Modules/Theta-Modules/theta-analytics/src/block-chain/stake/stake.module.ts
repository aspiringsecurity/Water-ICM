import { RpcModule } from './../rpc/rpc.module'
import { LatestStakeInfoEntity } from './latest-stake-info.entity'
import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StakeService } from './stake.service'
import { StakeResolver } from './stake.resolver'
import { StakeStatisticsEntity } from './stake-statistics.entity'
import { StakeRewardEntity } from './stake-reward.entity'
import { WalletModule } from '../wallet/wallet.module'
import { WalletEntity } from '../wallet/wallet.entity'
import { MarketModule } from '../../market/market.module'
import { StakeAnalyseService } from './stake-analyse.service'
import { CommonModule } from 'src/common/common.module'

@Module({
  imports: [
    WalletModule,
    MarketModule,
    RpcModule,
    TypeOrmModule.forFeature(
      [StakeStatisticsEntity, StakeRewardEntity, LatestStakeInfoEntity],
      'stake'
    ),
    TypeOrmModule.forFeature([WalletEntity], 'wallet'),

    CacheModule.register(),
    CommonModule
  ],
  providers: [StakeService, StakeResolver, StakeAnalyseService],
  exports: [StakeService]
})
export class StakeModule {}
