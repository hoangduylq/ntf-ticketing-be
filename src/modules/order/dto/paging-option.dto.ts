import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PagingOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  page?: number;

  @ApiProperty()
  limit?: number;
}
