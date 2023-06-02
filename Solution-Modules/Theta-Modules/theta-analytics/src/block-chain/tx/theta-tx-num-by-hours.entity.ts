import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLString } from 'graphql'

@ObjectType()
@Entity()
export class ThetaTxNumByHoursEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => Int)
  // @Column({
  //   type: 'int'
  // })
  year: number

  @Field(() => Int)
  // @Column({
  //   type: 'int'
  // })
  month: number

  @Field(() => Int)
  // @Column({
  //   type: 'int'
  // })
  date: number

  @Field(() => Int)
  // @Column({
  //   type: 'int'
  // })
  hour: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  block_number: number

  @Field(() => Float)
  @Column({
    type: 'float',
    default: 0
  })
  theta_fuel_burnt: number

  @Field(() => Float)
  @Column({
    type: 'float',
    default: 0
  })
  theta_fuel_burnt_by_smart_contract: number

  @Field(() => Float)
  @Column({
    type: 'float',
    default: 0
  })
  theta_fuel_burnt_by_transfers: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  active_wallet: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  coin_base_transaction: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  slash_transaction: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  send_transaction: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  reserve_fund_transaction: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  release_fund_transaction: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  service_payment_transaction: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  split_rule_transaction: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  deposit_stake_transaction: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  withdraw_stake_transaction: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  smart_contract_transaction: number

  @Field(() => Int)
  @Column({
    type: 'bigint',
    default: 0
  })
  latest_block_height: number

  @Field(() => GraphQLString)
  @Column({
    type: 'int',
    unique: true,
    // default: '1970-01-01 00:00:01',
    comment: '对应精确到小时的数据'
  })
  timestamp: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
