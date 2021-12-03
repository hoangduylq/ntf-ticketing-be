import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Permission' })
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column({ nullable: false, type: 'varchar' })
  name!: string;
}
