import { EventEntity } from './event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EventCategory' })
export class EventCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 255, type: 'varchar' })
  name: string;

  @OneToMany(() => EventEntity, (event) => event.category)
  events: EventEntity[];
}
