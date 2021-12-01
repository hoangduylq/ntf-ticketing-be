import { BankEntity } from './../../../payment/domain/entities/bank.entity';
import { UserEntity } from './../../../user/domain/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusEnum } from '../enums/status.enum';

@Entity({ name: 'Order' })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.Progress,
  })
  status!: StatusEnum;

  @CreateDateColumn()
  orderDate: Date;

  @Column({ nullable: false, type: 'float' })
  amount!: number;

  @ManyToOne(() => BankEntity, (bank) => bank.id)
  @JoinColumn()
  bank: BankEntity;

  @Column({ nullable: true, type: 'date' })
  paymentDate?: string;
}
