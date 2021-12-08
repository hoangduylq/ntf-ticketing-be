import { ApiProperty } from '@nestjs/swagger';
import { EventCategoryEntity } from '../domain/entities/eventCategory.entity';
import { UserEntity } from '../../user/domain/entities/user.entity';
import { StatusEnum } from '../../ticket/domain/enums/status.enum';
import { IsNotEmpty, Min } from 'class-validator';
export class CreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  totalTickets: number;

  @ApiProperty()
  @IsNotEmpty()
  availableTickets: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(0)
  ticketPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  maxTicketOrder: number;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  minTicketOrder: number;

  @ApiProperty()
  @IsNotEmpty()
  status: StatusEnum;

  @ApiProperty()
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
  category: EventCategoryEntity;
}
