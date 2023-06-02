import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLFloat, GraphQLInt } from 'graphql'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity()
export class BlokcListEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int', unique: true })
  height: number

  @Field()
  @Column({ unique: true })
  block_hash: string

  @Field(() => GraphQLInt)
  @Column({ type: 'int' })
  timestamp: number

  @Field(() => GraphQLFloat)
  @Column({ type: 'float' })
  tfuel_burnt: number

  @Field(() => GraphQLInt)
  @Column({ type: 'int', default: 0 })
  txns: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
