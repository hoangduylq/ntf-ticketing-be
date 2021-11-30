import { UserEntity } from './../../../user/domain/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'Bank' })
export class BankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  cardHolderName: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  creditNumber: string;

  @OneToMany(() => OrderEntity, (order) => order.bank)
  banks: OrderEntity[];
}
