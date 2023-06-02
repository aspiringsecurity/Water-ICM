import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { ThetaTxNumByHoursEntity } from './theta-tx-num-by-hours.entity'

@ObjectType()
export class ThetaTransactionStatisticsType {
  @Field(() => [ThetaTxNumByDateModel])
  ByDate: Array<ThetaTxNumByDateModel>

  @Field(() => [ThetaTxNumByHoursEntity])
  ByHour: ThetaTxNumByHoursEntity
}

@ObjectType()
export class ThetaTxNumByDateModel {
  @Field(() => Int)
  year: number

  @Field(() => Int)
  month: number

  @Field(() => Int)
  date: number

  @Field(() => Int)
  block_number: number

  @Field(() => Float)
  theta_fuel_burnt: number

  @Field(() => Float)
  theta_fuel_burnt_by_smart_contract: number

  @Field(() => Float)
  theta_fuel_burnt_by_transfers: number

  @Field(() => Int)
  active_wallet: number

  @Field(() => Int)
  coin_base_transaction: number

  @Field(() => Int)
  slash_transaction: number

  @Field(() => Int)
  send_transaction: number

  @Field(() => Int)
  reserve_fund_transaction: number

  @Field(() => Int)
  release_fund_transaction: number

  @Field(() => Int)
  service_payment_transaction: number

  @Field(() => Int)
  split_rule_transaction: number

  @Field(() => Int)
  deposit_stake_transaction: number

  @Field(() => Int)
  withdraw_stake_transaction: number

  @Field(() => Int)
  smart_contract_transaction: number

  @Field(() => Int)
  latest_block_height: number

  @Field(() => Int)
  timestamp: number
}

export enum TX_GET_DATA_AMOUNT {
  _2week = 14,
  _1month = 31,
  _3month = 93,
  _6month = 186,
  _1year = 366,
  _2year = 732
}
registerEnumType(TX_GET_DATA_AMOUNT, {
  name: 'TX_GET_DATA_AMOUNT',
  description: 'TX_GET_DATA_AMOUNT'
})
