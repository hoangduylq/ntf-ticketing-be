import { TicketRepository } from './ticket.repository';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';

@Processor('generate-token-nft-queue')
export class GenerateConsumer {
  constructor(
    @InjectRepository(TicketRepository)
    private ticketRepository: TicketRepository,
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
      console.log(id, ticket);
      await this.ticketRepository.save(ticket);
    } catch (error) {
      console.log(error.message);
    }
  }
}
