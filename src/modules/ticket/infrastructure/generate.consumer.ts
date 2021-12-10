import { EventService } from './../../event/services/event.service';
import { TicketRepository } from './ticket.repository';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';

@Processor('generate-token-nft-queue')
export class GenerateConsumer {
  constructor(
    @InjectRepository(TicketRepository)
    private ticketRepository: TicketRepository,
    private eventService: EventService,
  ) {}

  @Process('generate-job')
  async readOperationJob(job: Job<{ id: number; eventId: string }>) {
    try {
      const { id, eventId } = job.data;
      const generateToken = eventId + id + Math.random() * 1000;
      const ticket = {
        eventId,
        nftToken: generateToken,
      };
      await this.eventService.updateAvaiableTickets(eventId, -1);
      await this.ticketRepository.save(ticket);
    } catch (error) {
      console.log(error.message);
    }
  }
}
