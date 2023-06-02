import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'

@Entity()
@Unique(['smart_contract_address', 'timestamp'])
export class NftTradeStatisticsEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  smart_contract_address: string

  @Column()
  name: string

  @Column()
  img_uri: string

  @Column({ type: 'int' })
  users: number

  @Column({ type: 'float' })
  volume: number

  @Column({
    type: 'int',
    comment: '对应精确到小时的数据'
  })
  timestamp: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
