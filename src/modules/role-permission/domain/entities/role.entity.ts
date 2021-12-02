import { RolePermissionEntity } from './rolePermission.entity';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Role' })
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  name!: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  @OneToMany(
    () => RolePermissionEntity,
    (rolePermission) => rolePermission.role,
  )
  roles: RolePermissionEntity[];
}
