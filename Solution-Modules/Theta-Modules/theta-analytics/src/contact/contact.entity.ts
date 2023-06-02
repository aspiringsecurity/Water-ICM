import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

export enum SmartContractProtocolEnum {
  unknow = 1,
  tnt721,
  tnt20
}

@ObjectType()
@Entity()
export class ContactEntity {
  // @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  first_name: string

  @Field()
  @Column()
  last_name: string

  @Field()
  @Column()
  email: string

  @Field()
  @Column()
  content: string

  // @Field()
  @CreateDateColumn()
  create_date!: number

  // @Field()
  @UpdateDateColumn()
  update_date!: number
}
