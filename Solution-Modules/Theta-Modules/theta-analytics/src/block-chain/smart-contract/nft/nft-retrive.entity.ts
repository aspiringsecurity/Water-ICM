import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class NftRetriveEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  smart_contract_address: string

  @Column({ type: Boolean, default: false })
  retrived: boolean

  @CreateDateColumn()
  create_date!: Date

  @UpdateDateColumn()
  update_date!: Date
}
