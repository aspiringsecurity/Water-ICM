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
@Index(['from', 'timestamp'])
@Index(['to', 'timestamp'])
@Unique(['from', 'to', 'tx_hash'])
export class WalletSendHistoryEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  from: string

  @Field()
  @Column()
  to: string

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
