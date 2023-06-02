import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class ActiveWalletsEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    unique: true
  })
  snapshot_time: number

  @Column({ type: 'int' })
  active_wallets_amount: number

  @Column({ type: 'int' })
  active_wallets_amount_last_hour: number

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
