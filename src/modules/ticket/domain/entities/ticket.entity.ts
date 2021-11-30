import { EventEntity } from './../../../event/domain/entities/event.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusEnum } from '../enums/status.enum';

@Entity({ name: 'Ticket' })
export class TicketEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => EventEntity)
  @JoinColumn()
  event: EventEntity;

  @Column({ nullable: false })
  orderId: number;

  @Column({
    type: 'enum',
    enum: StatusEnum,
  })
  gender: StatusEnum;

  @Column({ nullable: false, type: 'varchar' })
  nftToken: string;

  @Column({ nullable: true, type: 'date' })
  createdAt: string;

  @Column({ nullable: true, type: 'date' })
  updatedAt: string;
}
