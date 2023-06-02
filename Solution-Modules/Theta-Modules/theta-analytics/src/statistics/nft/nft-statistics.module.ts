import { NftDetailResolver } from './nft-detail.resolver'
import { CacheModule, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NftBalanceEntity } from 'src/block-chain/smart-contract/nft/nft-balance.entity'
import { NftTransferRecordEntity } from 'src/block-chain/smart-contract/nft/nft-transfer-record.entity'
import { CommonModule } from 'src/common/common.module'
import { MarketModule } from 'src/market/market.module'
import { NftStatisticsAnalyseService } from './nft-statistics-analyse.service'
import { NftStatisticsEntity } from './nft-statistics.entity'
import { NftStatisticsResolver } from './nft-statistics.resolver'
import { NftStatisticsService } from './nft-statistics.service'

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([NftTransferRecordEntity, NftBalanceEntity], 'nft'),
    TypeOrmModule.forFeature([NftStatisticsEntity], 'nft-statistics'),
    CommonModule,
    MarketModule
  ],
  providers: [
    NftStatisticsAnalyseService,
    NftStatisticsResolver,
    NftStatisticsService,
    NftDetailResolver
  ],
  exports: [NftStatisticsService]
})
export class NftStatisticsModule {}
