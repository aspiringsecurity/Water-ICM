import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLFloat } from 'graphql'

@Entity()
@ObjectType({ description: 'Return to statistics related to token pledges' })
export class StakeStatisticsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Int, { description: 'Height of the block where pledge statistics are performed ' })
  @Column({
    type: 'int',
    unique: true
  })
  block_height: number

  @Field(() => Int, { description: 'Total number of elite edge nodes' })
  @Column({
    type: 'int'
  })
  total_elite_edge_node_number: number

  // @Field(() => Int)
  @Column({
    type: 'int'
  })
  effective_elite_edge_node_number: number

  @Field(() => String, { description: 'Number of theta fuel pledged to elite edge nodes' })
  @Column({
    type: 'bigint'
  })
  total_edge_node_stake_amount: number

  // @Field(() => String)
  @Column({
    type: 'bigint'
  })
  effective_elite_edge_node_stake_amount: number

  @Field(() => Int, { description: 'Total number of guardian nodes' })
  @Column({
    type: 'int'
  })
  total_guardian_node_number: number

  @Field(() => Int, { description: 'Number of online guardian nodes' })
  @Column({
    type: 'int'
  })
  effective_guardian_node_number: number

  @Field(() => String, {
    description: 'Total number of theta tokens pledged to the guardian nodes'
  })
  @Column({
    type: 'bigint'
  })
  total_guardian_stake_amount: number

  @Field(() => String, {
    description: 'Total number of theta pledges for the online guardian nodes'
  })
  @Column({
    type: 'bigint'
  })
  effective_guardian_stake_amount: number

  @Field(() => Int, { description: 'Total number of validator nodes' })
  @Column({
    type: 'int'
  })
  total_validator_node_number: number

  @Field(() => Int, { description: 'Number of online validator nodes' })
  @Column({
    type: 'int'
  })
  effective_validator_node_number: number

  @Field(() => String, {
    description: 'otal number of theta tokens pledged to the validator nodes'
  })
  @Column({
    type: 'bigint'
  })
  total_validator_stake_amount: number

  @Field(() => String, {
    description: 'The number of tokens pledged by the online validator nodes'
  })
  @Column({
    type: 'bigint'
  })
  effective_validator_stake_amount: number

  @Field(() => GraphQLFloat, { description: 'Theta Fuel pledge ratio' })
  @Column({
    type: 'float'
  })
  theta_fuel_stake_ratio: number

  @Field(() => GraphQLFloat, { description: 'Theta pledge ratio' })
  @Column({
    type: 'float'
  })
  theta_stake_ratio: number

  @Field(() => Int, { description: 'Block time for performing pledge statistics' })
  @Column({
    type: 'bigint',
    default: 0
  })
  timestamp: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
