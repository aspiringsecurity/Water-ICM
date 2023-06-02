import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLFloat, GraphQLInt } from 'graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity()
@Unique(['smart_contract_address'])
@Index(['update_timestamp'])
export class NftStatisticsEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  smart_contract_address: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ default: '', nullable: true })
  description: string

  @Field(() => GraphQLInt)
  @Column({ type: 'int', default: 0 })
  unique_owners: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int', default: 0 })
  items: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int', default: 0 })
  destroyed_items: number

  @Field({ nullable: true })
  @Column({ default: '', nullable: true })
  img_uri: string

  @Field()
  @Column()
  contract_uri: string

  @Field()
  @Column()
  contract_uri_detail: string

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  last_24_h_transactions: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  last_24_h_volume: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  last_24_h_users: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'float', default: 0 })
  last_24_h_floor_price: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'float', default: 0 })
  last_24_h_highest_price: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  last_7_days_transactions: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  last_7_days_volume: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  last_7_days_users: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'float', default: 0 })
  last_7_days_highest_price: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'float', default: 0 })
  last_7_days_floor_price: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  last_30_days_transactions: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  last_30_days_volume: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  last_30_days_users: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'float', default: 0 })
  last_30_days_highest_price: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'float', default: 0 })
  last_30_days_floor_price: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int', default: 0 })
  update_timestamp: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int', default: 0 })
  contract_uri_update_timestamp: number

  @Column({ type: 'int', default: 0 })
  refetch_times: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
