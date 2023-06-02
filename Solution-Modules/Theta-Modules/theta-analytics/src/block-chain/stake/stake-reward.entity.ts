import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { GraphQLFloat, GraphQLInt } from 'graphql'
export enum STAKE_TOKEN_TYPE_ENUM {
  theta_stake = 1,
  elite_node_stake
}
registerEnumType(STAKE_TOKEN_TYPE_ENUM, {
  name: 'STAKE_TOKEN_TYPE_ENUM'
})

@Entity()
@Index(['wallet_address', 'timestamp'])
@Unique(['wallet_address', 'reward_height'])
@ObjectType()
export class StakeRewardEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'real' })
  reward_amount: number

  @Field()
  @Column({ type: 'text' })
  wallet_address: string

  @Field(() => GraphQLInt)
  @Column({ type: 'integer' })
  reward_height: number

  @Field(() => GraphQLInt)
  @Column({
    type: 'integer'
  })
  timestamp: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
