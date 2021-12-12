import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';
export class EventDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;

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
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  saleStartDate: string;

  @ApiProperty()
  @IsNotEmpty()
  saleEndDate: string;

  @ApiProperty()
  @IsNotEmpty()
  eventStartDate: string;

  @ApiProperty()
  @IsNotEmpty()
  eventEndDate: string;

  //optional
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
  ticketImageUrl?: string;

  @ApiProperty()
  organizationInfo?: string;

  @ApiProperty()
  organizationEmail?: string;

  @ApiProperty()
  organizationPhone?: string;

  @ApiProperty()
  organizationAddress?: string;
}

export class Pagination {
  @ApiProperty()
  page?: number = 1;

  @ApiProperty()
  pageSize?: number = 0;
}

export class EventFilterDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  userId?: string;

  @ApiProperty()
  categoryId?: string;
}

export class PaginationEvent extends PartialType(
  IntersectionType(EventFilterDto, Pagination),
) {}
