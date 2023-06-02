import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLFloat, GraphQLInt } from 'graphql'
import { Paginated } from 'src/common/common.model'
import { NftStatisticsEntity } from './nft-statistics.entity'

@ObjectType()
export class PaginatedNftStatistics extends Paginated(NftStatisticsEntity) {}

@ObjectType()
export class NftDetailType {
  @Field({ nullable: true })
  contract_uri: string

  @Field({ nullable: true })
  smart_contract_address: string

  @Field({ nullable: true })
  contract_uri_detail: string

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  img_uri: string

  @Field({ nullable: true })
  description: string

  @Field(() => GraphQLInt)
  unique_owners: number

  @Field(() => GraphQLInt)
  items: number

  @Field(() => GraphQLInt)
  destroyed_items: number

  @Field({ nullable: true })
  update_timestamp: number

  @Field({ nullable: true })
  contract_uri_update_timestamp: number

  @Field(() => [NftDetailByDate], { nullable: true })
  by_24_hours: Array<NftDetailByDate>

  @Field(() => [NftDetailByDate], { nullable: true })
  by_7_days: Array<NftDetailByDate>

  @Field(() => [NftDetailByDate], { nullable: true })
  by_30_days: Array<NftDetailByDate>
}

@ObjectType()
export class NftDetailByDate {
  @Field(() => GraphQLInt)
  date: number

  @Field(() => GraphQLFloat)
  volume: number

  @Field(() => GraphQLInt)
  transactions: number

  @Field(() => GraphQLInt)
  users: number
}
