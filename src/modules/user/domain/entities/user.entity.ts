import { EventEntity } from './../../../event/domain/entities/event.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GenderEnum } from '../enums/gender.enum';
import { RoleEntity } from '../../../role-permission/domain/entities/role.entity';
import { BankEntity } from './../../../payment/domain/entities/bank.entity';
import { OrderEntity } from './../../../payment/domain/entities/order.entity';

@Entity({ name: 'User' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, length: 100, type: 'varchar' })
  name!: string;

  @Column({ nullable: false, length: 100, type: 'varchar' })
  email!: string;

  @Column({ nullable: false, length: 20, type: 'varchar' })
  username!: string;

  @Column({ nullable: false, type: 'varchar' })
  password!: string;

  @Column({ nullable: true, type: 'date' })
  birthday?: string;

  @Column({ nullable: true, length: 11, type: 'varchar' })
  numberPhone?: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
  })
  gender?: GenderEnum;

  @Column({ nullable: true, type: 'text' })
  avatar?: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn()
  role: RoleEntity;

  @Column({ nullable: false, type: 'boolean', default: false })
  isSocial!: boolean;

  @Column({ nullable: true, type: 'boolean', default: false })
  isDeleted?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @OneToMany(() => BankEntity, (bank) => bank.user)
  banks: BankEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
