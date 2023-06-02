import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLString } from 'graphql'

@ObjectType()
@Entity()
@Index(['address', 'timestamp'])
@Index(['height'])
@Index(['address', 'height'])
export class SmartContractCallLogEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column()
  address: string

  @Column({ nullable: true })
  data: string

  @Column({
    type: 'int',
    default: 0
  })
  height: number

  @Column({ default: '', unique: false })
  transaction_hash: string

  @Field(() => GraphQLString, { description: 'Calling time' })
  @Column({
    type: 'int'
    // default: '1970-01-01 00:00:01'
  })
  timestamp: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
