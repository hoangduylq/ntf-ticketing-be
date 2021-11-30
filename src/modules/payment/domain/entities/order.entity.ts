import { BankEntity } from 'src/modules/payment/domain/entities/bank.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusEnum } from './status.enum';

@Entity({ name: 'Order' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: false })
  orderId: number;

  @Column({
    type: 'enum',
    enum: StatusEnum,
  })
  status: StatusEnum;

  @Column({ nullable: true, type: 'date' })
  orderDate: string;

  @Column({ nullable: true, type: 'float' })
  amount: number;

  @ManyToOne(() => BankEntity, (bank) => bank.id)
  @JoinColumn()
  bank: BankEntity;

  @Column({ nullable: true, type: 'date' })
  paymentDate: string;
}
