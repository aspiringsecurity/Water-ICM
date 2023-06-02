import { SmartContractCallLogEntity } from './../smart-contract-call-log.entity'
import { NftRetriveEntity } from './nft-retrive.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NftService } from './nft.service'
import { NftBalanceEntity } from './nft-balance.entity'
import { NftTransferRecordEntity } from './nft-transfer-record.entity'
import { SmartContractCallRecordEntity } from '../smart-contract-call-record.entity'
import { SmartContractEntity } from '../smart-contract.entity'
import { NftResolver } from './nft.resolver'
import { CommonModule } from 'src/common/common.module'
import { NftAnalyseService } from './nft-analyse.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([NftBalanceEntity, NftTransferRecordEntity, NftRetriveEntity], 'nft'),
    TypeOrmModule.forFeature(
      [SmartContractCallRecordEntity, SmartContractEntity, SmartContractCallLogEntity],
      'smart_contract'
    ),
    CommonModule
  ],
  providers: [NftService, NftResolver, NftAnalyseService],
  exports: [NftService]
})
export class NftModule {}
