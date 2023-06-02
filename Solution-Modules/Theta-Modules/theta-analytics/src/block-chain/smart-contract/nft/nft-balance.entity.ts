import { Field, Int, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'

export enum NftStatusEnum {
  invalid = 1,
  valid = 2
}

@ObjectType()
@Entity()
@Index(['smart_contract_address'])
@Index(['owner'])
@Index(['smart_contract_address', 'owner'])
@Unique(['smart_contract_address', 'token_id'])
export class NftBalanceEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Field()
  @Column()
  smart_contract_address: string

  @Field()
  @Column()
  owner: string

  @Field()
  @Column()
  from: string

  @Field()
  @Column({ default: '' })
  contract_uri: string

  @Field()
  @Column({ default: '' })
  base_token_uri: string

  @Field()
  @Column({ default: '' })
  token_uri: string

  @Field()
  @Column({ default: '' })
  name: string

  @Field({ nullable: true })
  @Column({ default: '', nullable: true })
  img_uri: string

  @Field()
  @Column({ default: '' })
  detail: string

  @Field(() => Int)
  @Column({ type: 'int' })
  token_id: number

  @Column({ type: 'int', default: 0 })
  refetch_times: number
  //   @Column({ type: 'int' })
  //   status: NftStatusEnum

  @CreateDateColumn()
  create_date!: Date

  @UpdateDateColumn()
  update_date!: Date
}
