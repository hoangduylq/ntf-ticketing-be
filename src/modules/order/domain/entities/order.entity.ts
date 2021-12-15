import { BankEntity } from '../../../user/domain/entities/bank.entity';
import { UserEntity } from './../../../user/domain/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusEnum } from '../enums/status.enum';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';

@Entity({ name: 'Order' })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  eventId: string;

  @ManyToOne(() => EventEntity, (event) => event.id)
  @JoinColumn({ name: 'uuid' })
  event: EventEntity;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'uuid' })
  bankId: string;

  @ManyToOne(() => BankEntity, (bank) => bank.id)
  @JoinColumn()
  bank: BankEntity;

  @Column({ nullable: false, type: 'float' })
  amount!: number;

  @Column({ nullable: true, type: 'simple-array' })
  tickets?: string[];

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.Progress,
  })
  status!: StatusEnum;

  @Column({ nullable: true, type: 'date' })
  paymentDate?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
