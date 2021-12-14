import { StatusEventEnum } from './../enums/status.enum';
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
import { EventCategoryEntity } from './eventCategory.entity';
import { UserEntity } from './../../../user/domain/entities/user.entity';
import { TicketEntity } from './../../../ticket/domain/entities/ticket.entity';
import { OrderEntity } from './../../../order/domain/entities/order.entity';

@Entity({ name: 'Event' })
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => EventCategoryEntity, (category) => category.id)
  @JoinColumn({ name: 'categoryId' })
  category: EventCategoryEntity;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ nullable: false, length: 200, type: 'varchar' })
  name!: string;

  @Column({ nullable: true, type: 'text' })
  logoUrl?: string;

  @Column({ nullable: true, type: 'text' })
  bannerUrl?: string;

  @Column({ nullable: true, type: 'varchar' })
  description?: string;

  @Column({ nullable: true, type: 'varchar' })
  eventPlaceName?: string;

  @Column({ nullable: true, type: 'varchar' })
  eventAddress?: string;

  @Column({ nullable: true, type: 'date' })
  saleStartDate?: string;

  @Column({ nullable: true, type: 'date' })
  saleEndDate?: string;

  @Column({ nullable: true, type: 'date' })
  eventStartDate?: string;

  @Column({ nullable: true, type: 'date' })
  eventEndDate?: string;

  @Column({ nullable: true, type: 'integer' })
  totalTickets?: number;

  @Column({ nullable: true, type: 'integer' })
  availableTickets?: number;

  @Column({ nullable: true, type: 'text' })
  ticketImageUrl?: string;

  @Column({ nullable: true, type: 'decimal' })
  ticketPrice?: number;

  @Column({ nullable: true, type: 'integer' })
  maxTicketOrder?: number;

  @Column({ nullable: true, type: 'integer' })
  minTicketOrder?: number;

  @Column({ nullable: true, type: 'varchar' })
  organizationInfo?: string;

  @Column({ nullable: true, type: 'varchar' })
  organizationEmail?: string;

  @Column({ nullable: true, length: 11, type: 'varchar' })
  organizationPhone?: string;

  @Column({ nullable: true, type: 'varchar' })
  organizationAddress?: string;

  @Column({ nullable: true, default: false, type: 'boolean' })
  isDeleted: boolean;

  @Column({
    type: 'enum',
    enum: StatusEventEnum,
    default: StatusEventEnum.Pending,
  })
  status: StatusEventEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TicketEntity, (ticket) => ticket.event)
  tickets: TicketEntity[];

  @OneToMany(() => OrderEntity, (order) => order.event)
  orders: OrderEntity[];
}
