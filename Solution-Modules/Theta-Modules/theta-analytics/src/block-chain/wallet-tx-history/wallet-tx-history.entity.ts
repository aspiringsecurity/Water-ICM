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
export class WalletTxHistoryEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({
    unique: true
  })
  wallet: string

  @Field()
  @Column({
    default: ''
  })
  tx_ids: string

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
