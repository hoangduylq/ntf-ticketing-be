import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Permission' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;
}
