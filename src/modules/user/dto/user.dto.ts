import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEntity } from './../../role-permission/domain/entities/role.entity';
export class UserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  role: RoleEntity;

  @ApiProperty()
  @IsNotEmpty()
  isSocial: boolean;
}
