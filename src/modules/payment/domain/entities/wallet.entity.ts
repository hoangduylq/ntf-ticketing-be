import { UserEntity } from './../../../user/domain/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Wallet' })
export class WalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: false, type: 'varchar' })
  walletAddress!: string;
}
