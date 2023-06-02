import { TokenBalanceType } from '../wallet/wallet-balance.model'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLBoolean } from 'graphql'
export enum STAKE_NODE_TYPE_ENUM {
  validator,
  guardian,
  edge_cache
}

registerEnumType(STAKE_NODE_TYPE_ENUM, { name: 'STAKE_NODE_TYPE_ENUM' })

@ObjectType()
export class Stake {
  @Field()
  source: string //"0x4aefa39caeadd662ae31ab0ce7c8c2c9c0a013e8",

  @Field()
  amount: string //"20000000000000000000000000",

  @Field(() => GraphQLBoolean)
  withdrawn: boolean //false,

  @Field()
  return_height: string //"18446744073709551615"
}

@ObjectType()
export class StakeRewardModel {
  @Field(() => TokenBalanceType, { nullable: true })
  last_24_hour: TokenBalanceType

  @Field(() => TokenBalanceType, { nullable: true })
  last_3_days: TokenBalanceType

  @Field(() => TokenBalanceType, { nullable: true })
  last_7_days: TokenBalanceType
}
