import { UserEntity } from './../../../user/domain/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Wallet' })
export class WalletEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  walletAddress: string;
}
