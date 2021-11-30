import { EventEntity } from './../../../event/domain/entities/event.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GenderEnum } from '../enums/gender.enum';
import { RoleEntity } from 'src/modules/auth/domain/entities/role.entity';
import { BankEntity } from 'src/modules/payment/domain/entities/bank.entity';
import { OrderEntity } from 'src/modules/payment/domain/entities/order.entity';

@Entity({ name: 'User' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 100, type: 'varchar' })
  name: string;

  @Column({ nullable: false, length: 100, type: 'varchar' })
  email: string;

  @Column({ nullable: false, length: 20, type: 'varchar' })
  username: string;

  @Column({ nullable: false, type: 'varchar' })
  password: string;

  @Column({ nullable: true, type: 'date' })
  birthday: string;

  @Column({ nullable: true, length: 11, type: 'varchar' })
  numberPhone: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
  })
  gender: GenderEnum;

  @Column({ nullable: true, type: 'varchar' })
  avatar: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn()
  role: RoleEntity;

  @Column({ nullable: true })
  isSocial: boolean;

  @Column({ nullable: true })
  isDelete: boolean;

  @Column({ nullable: true, type: 'date' })
  createdAt: string;

  @Column({ nullable: true, type: 'date' })
  updatedAt: string;

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @OneToMany(() => BankEntity, (bank) => bank.user)
  banks: BankEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
