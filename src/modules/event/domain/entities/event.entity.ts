import { StatusEnum } from '../enums/status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventCategoryEntity } from './eventCategory.entity';
import { UserEntity } from './../../../user/domain/entities/user.entity';

@Entity({ name: 'Event' })
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventCategoryEntity, (category) => category.id)
  @JoinColumn()
  category: EventCategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: false, length: 200, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  logoUrl: string;

  @Column({ nullable: true, type: 'varchar' })
  bannerUrl: string;

  @Column({ nullable: true, type: 'varchar' })
  description: string;

  @Column({ nullable: true, type: 'varchar' })
  eventPlaceName: string;

  @Column({ nullable: true, type: 'varchar' })
  eventAddress: string;

  @Column({ nullable: true, type: 'date' })
  saleStartDate: string;

  @Column({ nullable: true, type: 'date' })
  saleEndDate: string;

  @Column({ nullable: true, type: 'date' })
  eventStartDate: string;

  @Column({ nullable: true, type: 'date' })
  eventEndDate: string;

  @Column({ nullable: false })
  totalTickets: number;

  @Column({ nullable: false })
  availableTickets: number;

  @Column({ nullable: true, type: 'varchar' })
  ticketImageUrl: string;

  @Column({ nullable: false, type: 'float' })
  ticketPrice: number;

  @Column({ nullable: false })
  maxTicketOrder: number;

  @Column({ nullable: false })
  minTicketOrder: number;

  @Column({ nullable: true, length: 255, type: 'varchar' })
  organizationInfo: string;

  @Column({ nullable: true, length: 255, type: 'varchar' })
  organizationEmail: string;

  @Column({ nullable: true, length: 11, type: 'varchar' })
  organizationPhone: string;

  @Column({ nullable: true, length: 255, type: 'varchar' })
  organizationAddress: string;

  @Column({ nullable: true })
  isDeleted: boolean;

  @Column({
    type: 'enum',
    enum: StatusEnum,
  })
  status: StatusEnum;

  @Column({ nullable: true, type: 'date' })
  createdAt: string;

  @Column({ nullable: true, type: 'date' })
  updatedAt: string;
}
