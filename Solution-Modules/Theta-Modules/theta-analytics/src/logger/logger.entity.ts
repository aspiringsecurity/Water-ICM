import { Field, ObjectType } from '@nestjs/graphql'
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
@Index(['update_timestamp'])
export class LoggerEntity {
  // @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  query: string

  @Field()
  @Column({ unique: true })
  hash: string

  @Field()
  @Column({ type: 'int', default: 0 })
  call_times: number

  @Field()
  @Column({ type: 'int', default: 0 })
  update_timestamp: number

  // @Field()
  @CreateDateColumn()
  create_date!: number

  // @Field()
  @Field()
  @UpdateDateColumn()
  update_date!: number
}
