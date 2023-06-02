import { RpcModule } from './../rpc/rpc.module'
import { SmartContractCallLogEntity } from './smart-contract-call-log.entity'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SmartContractEntity } from './smart-contract.entity'
import { SmartContractCallRecordEntity } from './smart-contract-call-record.entity'
import { SmartContractService } from './smart-contract.service'
import { SmartContractResolver } from './smart-contract.resolver'
import { NftModule } from './nft/nft.module'
import { CommonModule } from 'src/common/common.module'
import { SmartContractAnalyseService } from './smart-contract-analyse.service'
// import { AnalyseService } from 'src/analyse/analyse.service'

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [SmartContractEntity, SmartContractCallRecordEntity, SmartContractCallLogEntity],
      'smart_contract'
    ),
    NftModule,
    CommonModule,
    RpcModule
  ],
  providers: [SmartContractService, SmartContractResolver, SmartContractAnalyseService],
  exports: [SmartContractService]
})
export class SmartContractModule {}
