import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../domain/enums/status.enum';

export class TicketDto {
  @ApiProperty()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  status?: StatusEnum;

  @ApiProperty()
  nftToken?: string;
}
