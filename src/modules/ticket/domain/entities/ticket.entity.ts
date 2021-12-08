import { EventEntity } from './../../../event/domain/entities/event.entity';
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

@Entity({ name: 'Ticket' })
export class TicketEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  eventId: string;

  @ManyToOne(() => EventEntity, (event) => event.id)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.Ready,
  })
  status: StatusEnum;

  @Column({ nullable: true, type: 'varchar' })
  nftToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
