import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLFloat } from 'graphql'
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
@Unique(['smart_contract_address', 'token_id', 'timestamp'])
@Index(['smart_contract_address'])
@Index(['smart_contract_address', 'timestamp'])
@Index(['from'])
@Index(['to'])
export class NftTransferRecordEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  smart_contract_address: string

  @Field()
  @Column()
  from: string

  @Field()
  @Column({ default: '' })
  name: string

  @Field({ nullable: true })
  @Column({ default: '', nullable: true })
  img_uri: string

  @Field()
  @Column()
  to: string

  @Field(() => Int)
  @Column({ type: 'int' })
  token_id: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'float', default: 0 })
  payment_token_amount: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'float', default: 0 })
  tdrop_mined: number

  @Field(() => Int)
  @Column({
    type: 'int',
    default: 0
  })
  height: number

  @Field()
  @Column({ default: '' })
  transaction_hash: string

  @Field(() => Int)
  @Column({ type: 'int' })
  timestamp: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
