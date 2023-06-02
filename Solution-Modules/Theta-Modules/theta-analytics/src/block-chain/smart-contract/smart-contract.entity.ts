import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLBoolean } from 'graphql'

export enum SmartContractProtocolEnum {
  unknow = 1,
  tnt721,
  tnt20
}
registerEnumType(SmartContractProtocolEnum, {
  name: 'SmartContractProtocolEnum'
})

@ObjectType()
@Entity()
@Index(['name', 'protocol'])
@Index(['call_times'])
@Index(['last_seven_days_call_times'])
@Index(['last_24h_call_times'])
// @Index(['name'])
export class SmartContractEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field({ description: 'Address of the smart contract' })
  @Column({ unique: true })
  contract_address: string

  @Column({ type: 'int', default: 0 })
  height: number

  @Field(() => GraphQLBoolean)
  @Column({ type: Boolean, default: false })
  verified: boolean

  @Field(() => Int)
  @Column({ type: 'int', default: SmartContractProtocolEnum.unknow })
  protocol: SmartContractProtocolEnum

  @Field({ nullable: true })
  @Column({ default: null })
  abi: string

  @Field({ nullable: true })
  @Column({ default: null })
  source_code: string

  @Field({ nullable: true })
  @Column({ default: null })
  byte_code: string

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  verification_date: number

  @Field({ nullable: true })
  @Column({ default: null })
  compiler_version: string

  @Field({ nullable: true })
  @Column({ default: null })
  optimizer: string

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  optimizerRuns: number

  @Field({ nullable: true })
  @Column({ default: null })
  name: string

  @Field({ nullable: true })
  @Column({ default: null })
  function_hash: string

  @Field({ nullable: true })
  @Column({ default: null })
  constructor_arguments: string

  @Field(() => Int, { description: 'Total number of smart contract calls' })
  @Index('call_times')
  @Column({
    type: 'int',
    default: 1
  })
  call_times: number

  @Field(() => Int, { description: 'Number of smart contract calls in the last 7 days' })
  @Index('last_seven_days_call_times')
  @Column({
    type: 'int',
    default: 1
  })
  last_seven_days_call_times: number

  @Field(() => Int, { description: 'Number of smart contract calls in the last 24 hours' })
  @Index('last_24h_call_times')
  @Column({
    type: 'int',
    default: 1
  })
  last_24h_call_times: number

  @Field(() => Int, { description: 'call times update timestamp' })
  @Index('call_times_update_date')
  @Column({
    type: 'int',
    default: 0
  })
  call_times_update_timestamp: number

  @Field(() => Int, { description: 'verification check timestamp' })
  @Column({
    type: 'int',
    default: 0
  })
  verification_check_timestamp: number

  @Field()
  @Column({ default: '' })
  contract_uri: string

  @Field()
  @Column({ default: '' })
  contract_uri_detail: string

  @Field(() => Int)
  @Column({ default: 14687288, type: 'int' }) //13764000 //14686101
  latest_record_parse_height: number

  // @Field()
  @CreateDateColumn()
  create_date!: number

  // @Field()
  @UpdateDateColumn()
  update_date!: number
}
