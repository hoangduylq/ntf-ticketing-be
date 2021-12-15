import { GenderEnum } from './../../user/domain/enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  gender?: GenderEnum;

  @ApiProperty()
  birthday?: string;

  @ApiProperty()
  numberPhone?: string;

  @ApiProperty()
  avatar?: string;
}
