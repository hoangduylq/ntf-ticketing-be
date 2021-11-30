import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'RolePermission' })
export class RolePermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn()
  role: RoleEntity;

  @ManyToOne(() => PermissionEntity, (permission) => permission.id)
  @JoinColumn()
  permission: PermissionEntity;
}
