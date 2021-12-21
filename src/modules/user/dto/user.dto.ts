import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { GenderEnum } from '../domain/enums/gender.enum';
export class UserDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  isSocial?: boolean;

  @ApiProperty()
  gender?: GenderEnum;

  @ApiProperty()
  birthday?: string;

  @ApiProperty()
  numberPhone?: string;

  @ApiProperty()
  avatar?: string;
}
