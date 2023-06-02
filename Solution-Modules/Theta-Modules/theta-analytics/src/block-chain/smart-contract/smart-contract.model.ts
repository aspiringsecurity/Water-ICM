import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLBoolean } from 'graphql'
import { SmartContractEntity } from './smart-contract.entity'

@ObjectType({ description: 'Statistics on smart contract related calls' })
export class SmartContractStatisticsType {
  @Field(() => [SmartContractEntity])
  CallRank: Array<SmartContractEntity>

  @Field(() => [SmartContractEntity])
  Search: Array<SmartContractEntity>
}

@ObjectType()
export class UpdateRecordType {
  @Field(() => Int)
  affected_rows: number
}

@ObjectType()
export class SmartContractScType {
  @Field()
  address: string

  @Field()
  abi: string

  @Field()
  source_code: string

  @Field()
  verification_date: string

  @Field()
  compiler_version: string

  @Field()
  optimizer: string

  @Field()
  optimizerRuns: number

  @Field()
  name: string

  @Field()
  function_hash: string

  @Field()
  constructor_arguments: string
}

@ObjectType({ description: 'smart contract verification' })
export class SmartContractVerifyType {
  @Field(() => GraphQLBoolean)
  is_verified: boolean

  @Field(() => SmartContractScType, { nullable: true })
  smart_contract: SmartContractScType
}

export enum RankByEnum {
  call_times,
  last_24h_call_times,
  last_seven_days_call_times
}
registerEnumType(RankByEnum, {
  name: 'RankByEnum'
})
