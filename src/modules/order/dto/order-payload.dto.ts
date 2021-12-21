import { AutoMap } from '@automapper/classes';

export class EventDto {
  @AutoMap()
  name: string;

  @AutoMap()
  logoUrl: string;

  @AutoMap()
  eventStartDate: string;

  @AutoMap()
  eventPlaceName: string;

  @AutoMap()
  eventAddress: string;

  @AutoMap()
  ticketPrice: number;
}

export class OrderPayloadDto {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  amount: number;

  @AutoMap()
  tickets: string[];

  @AutoMap({ typeFn: () => EventDto })
  event: EventDto;
}
