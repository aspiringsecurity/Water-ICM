import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLInt, GraphQLString } from 'graphql'

@ObjectType()
export class KlineObj {
  @Field()
  time: string

  @Field(() => Float)
  price: number
}
export enum KLINE_INTERVAL {
  _1m = '1m',
  _3m = '3m',
  _5m = '5m',
  _15m = '15m',
  _30m = '30m',
  _1h = '1h',
  _2h = '2h',
  _4h = '4h',
  _6h = '6h',
  _8h = '8h',
  _12h = '12h',
  _1d = '1d',
  _3d = '3d',
  _1w = '1w',
  _1M = '1M'
}
registerEnumType(KLINE_INTERVAL, {
  name: 'KLINE_INTERVAL'
})

export enum TOKEN_PAIR_TYPE {
  thetaUsdt = 'THETAUSDT',
  tfuelUSdt = 'TFUELUSDT'
}
registerEnumType(TOKEN_PAIR_TYPE, {
  name: 'TOKEN_PAIR_TYPE'
})

@ObjectType()
export class TokenMarketInformationType {
  @Field()
  name: string

  @Field(() => Float)
  price: number

  @Field()
  circulating_supply: number

  @Field()
  total_supply: number

  @Field(() => Float)
  volume_24h: number

  @Field(() => Float)
  price_change_percent: number

  @Field(() => [KlineObj])
  kline: KlineObj[]
}

@ObjectType()
export class MarketInformationType {
  @Field(() => TokenMarketInformationType)
  Theta: TokenMarketInformationType

  @Field(() => TokenMarketInformationType)
  ThetaFuel: TokenMarketInformationType
}
