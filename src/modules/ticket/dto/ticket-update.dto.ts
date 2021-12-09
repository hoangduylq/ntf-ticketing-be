import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../domain/enums/status.enum';

export class TicketUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  status: StatusEnum;
}
