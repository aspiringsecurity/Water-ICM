import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { STAKE_NODE_TYPE_ENUM } from './stake.model'
// import { STAKE_NODE_TYPE_ENUM } from './stake.entity'

@Entity()
export class LatestStakeInfoEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', unique: true })
  node_type: STAKE_NODE_TYPE_ENUM

  @Column({ type: 'int' })
  height: number

  @Column({ type: 'text' })
  holder: string

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
