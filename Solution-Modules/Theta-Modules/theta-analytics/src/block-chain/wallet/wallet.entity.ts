import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@ObjectType()
@Entity()
@Index(['latest_active_time'])
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({
    unique: true
  })
  address: string

  @Field()
  @Column({
    default: ''
  })
  txs_hash_list: string

  @Field(() => Int)
  @Column({ type: 'int' })
  latest_active_time: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
