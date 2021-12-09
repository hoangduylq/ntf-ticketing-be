import { TicketDto } from './../dto/ticket.dto';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketRepository } from './../infrastructure/ticket.repository';
import { Queue } from 'bull';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketRepository)
    private ticketRepository: TicketRepository,
    @InjectQueue('generate-token-nft-queue')
    private queue: Queue,
  ) {}

  async create(ticketDto: TicketDto): Promise<any> {
    const { eventId, total } = ticketDto;
    for (let i = 0; i < total; i++) {
      await this.generateTokenNft(eventId + i);
    }
  }

  async findAll() {
    const entities = await this.ticketRepository.find();

    const dtos = entities.map((entity) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { nftToken, ...rest } = entity;
      const dto = rest;
      return dto;
    });
    return dtos;
  }

  async findOneById(id: string) {
    const entity = await this.ticketRepository.findOne({ id });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { nftToken, ...rest } = entity;
    const dto = rest;
    return dto;
  }

  async update(id: string, ticketDto: TicketDto) {
    const entity = await this.ticketRepository.findOne(id);
    if (!entity) {
      return false;
    }

    await this.ticketRepository.update(id, ticketDto);

    return true;
  }

  async remove(id: string) {
    const entity = await this.ticketRepository.findOne(id);
    if (!entity) {
      return false;
    }

    await this.ticketRepository.remove(entity);

    return true;
  }

  async generateTokenNft(id: string) {
    await this.queue.add('generate-job', {
      token: id,
    });
  }
}
