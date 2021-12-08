import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OrderEntity } from 'src/modules/payment/domain/entities/order.entity';
import { StatusEnum } from 'src/modules/payment/domain/enums/status.enum';
import { TicketEntity } from 'src/modules/ticket/domain/entities/ticket.entity';

export class UpdateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  status?: StatusEnum;

  @ApiProperty()
  logoUrl?: string;

  @ApiProperty()
  bannerUrl?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  eventPlaceName?: string;

  @ApiProperty()
  eventAddress?: string;

  @ApiProperty()
  saleStartDate?: string;

  @ApiProperty()
  saleEndDate?: string;

  @ApiProperty()
  eventStartDate?: string;

  @ApiProperty()
  eventEndDate?: string;

  @ApiProperty()
  ticketImageUrl?: string;

  @ApiProperty()
  organizationInfo?: string;

  @ApiProperty()
  organizationEmail?: string;

  @ApiProperty()
  organizationPhone?: string;

  @ApiProperty()
  organizationAddress?: string;

  @ApiProperty()
  isDeleted?: boolean;

  @ApiProperty()
  tickets?: TicketEntity[];

  @ApiProperty()
  orders?: OrderEntity[];
}
