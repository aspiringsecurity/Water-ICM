import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class CountEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'int', default: 0 })
  count: number

  @Column({ unique: true })
  key: string

  @CreateDateColumn()
  create_date!: number

  @UpdateDateColumn()
  update_date!: number
}
