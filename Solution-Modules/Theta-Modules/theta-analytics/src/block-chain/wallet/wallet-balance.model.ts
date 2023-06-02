import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLBoolean } from 'graphql'

@ObjectType()
export class FiatCurrencyType {
  @Field(() => Float)
  usd: number

  @Field(() => Float)
  cny: number

  @Field(() => Float)
  eur: number
}

@ObjectType()
export class TokenBalanceType {
  @Field()
  amount: number

  @Field(() => FiatCurrencyType)
  fiat_currency_value: FiatCurrencyType
}

@ObjectType()
export class StakeBalanceType {
  @Field()
  node_address: string

  @Field()
  amount: number

  @Field(() => GraphQLBoolean)
  withdrawn: boolean

  @Field()
  return_height: string

  @Field(() => FiatCurrencyType)
  fiat_currency_value: FiatCurrencyType
}

@ObjectType()
export class TotalBalanceType {
  @Field(() => Float)
  theta_amount: number

  @Field(() => Float)
  theta_fuel_amount: number

  @Field(() => FiatCurrencyType)
  fiat_currency_value: FiatCurrencyType
}

@ObjectType()
export class BalanceModel {
  //theta balance of theta wallet
  @Field(() => TokenBalanceType)
  theta: TokenBalanceType

  //theta fuel balance of theta wallet
  @Field(() => TokenBalanceType)
  theta_fuel: TokenBalanceType

  //theta staked to guardian
  @Field(() => [StakeBalanceType], { nullable: true })
  stake_to_guardian: Array<StakeBalanceType>

  //theta fuel staked to elite node
  @Field(() => [StakeBalanceType], { nullable: true })
  stake_to_elite_node: Array<StakeBalanceType>

  //theta fuel staked to elite node
  @Field(() => [StakeBalanceType], { nullable: true })
  stake_to_validator_node: Array<StakeBalanceType>

  //total value of the address
  @Field(() => TotalBalanceType)
  total: TotalBalanceType
}
