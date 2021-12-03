import { RoleEntity } from './../../role-permission/domain/entities/role.entity';
export class UserDto {
  name: string;
  email: string;
  role: RoleEntity;
}
