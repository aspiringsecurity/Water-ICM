import { GraphQLInt } from 'graphql'
// import { THETA_TX_TYPE_ENUM, THETA_TRANSACTION_TYPE_ENUM } from './../../tx/theta.enum';
// import { THETA_TX_TYPE_ENUM } from './../../tx/theta.enum'
// import { STAKE_NODE_TYPE_ENUM } from './../../stake/stake.entity'
import { STAKE_NODE_TYPE_ENUM } from 'src/block-chain/stake/stake.model'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLFloat } from 'graphql'
import { THETA_TRANSACTION_TYPE_ENUM } from 'src/block-chain/tx/theta.enum'

@ObjectType()
@Entity()
@Index(['wallet_address', 'timestamp'])
@Unique(['wallet_address', 'node_address', 'height'])
export class WalletDpWdHistoryEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  wallet_address: string

  @Field()
  @Column()
  tx_hash: string

  @Field(() => GraphQLFloat)
  @Column({
    type: 'float'
  })
  theta: number

  @Field(() => GraphQLFloat)
  @Column({
    type: 'float'
  })
  tfuel: number

  @Field()
  @Column()
  node_address: string

  @Field(() => STAKE_NODE_TYPE_ENUM)
  @Column({
    type: 'int'
  })
  node_type: STAKE_NODE_TYPE_ENUM

  @Field(() => THETA_TRANSACTION_TYPE_ENUM)
  @Column({
    type: 'int'
  })
  tx_type: THETA_TRANSACTION_TYPE_ENUM

  @Field(() => GraphQLInt)
  @Column({
    type: 'int'
  })
  height: number

  @Field(() => GraphQLInt)
  @Column({
    type: 'int'
  })
  timestamp: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
