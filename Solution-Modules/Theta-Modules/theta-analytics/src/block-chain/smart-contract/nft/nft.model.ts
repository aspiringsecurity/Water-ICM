import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Paginated } from 'src/common/common.model'
import { SmartContractEntity } from '../smart-contract.entity'
import { NftBalanceEntity } from './nft-balance.entity'
import { NftTransferRecordEntity } from './nft-transfer-record.entity'

@ObjectType()
export class NftType {}

@ObjectType()
export class NftMetaType {
  @Field(() => Int)
  unique_holder: number

  @Field()
  total: number
}

@ObjectType()
export class PaginatedNftBalance extends Paginated(NftBalanceEntity) {}

@ObjectType()
export class PaginatedSmartContract extends Paginated(SmartContractEntity) {}

@ObjectType()
export class PaginatedNftTransferRecord extends Paginated(NftTransferRecordEntity) {}
