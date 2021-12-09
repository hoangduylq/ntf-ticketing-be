import { StatusEnum } from './../domain/enums/status.enum';
import { TicketDto } from './../dto/ticket.dto';
import { InjectQueue } from '@nestjs/bull';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketRepository } from './../infrastructure/ticket.repository';
import { Queue } from 'bull';
import { TicketUpdateDto } from '../dto/ticket-update.dto';
import { IPaginateOptions } from '../domain/interfaces/paginate_options.interface';

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
    for (let i = 1; i <= total; i++) {
      await this.queue.add('generate-job', {
        eventId: eventId,
        id: i,
      });
    }
  }

  async findAll() {
    try {
      const entities = await this.ticketRepository.find();

      return entities;

      // const dtos = entities.map((entity) => {
      //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //   const { nftToken, ...rest } = entity;
      //   const dto = rest;
      //   return dto;
      // });
      // return dtos;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findTicketByEventAndStatus(eventId: string, status: StatusEnum) {
    try {
      const entities = await this.ticketRepository.find({
        where: { eventId: eventId, status: status },
      });
      return entities;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneById(id: string) {
    const entity = await this.ticketRepository.findOne({ id });
    return entity;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { nftToken, ...rest } = entity;
    // const dto = rest;
    // return dto;
  }

  async update(id: string, ticketUpdateDto: TicketUpdateDto) {
    try {
      const entity = await this.ticketRepository.findOne(id);
      if (!entity) {
        return false;
      }

      await this.ticketRepository.update(id, ticketUpdateDto);

      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const entity = await this.ticketRepository.findOne(id);
      if (!entity) {
        return false;
      }
      await this.ticketRepository.remove(entity);
      return true;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async paginate(options: IPaginateOptions) {
    try {
      const { eventId, page, limit } = options;

      const entities = await this.ticketRepository.find({
        where: {
          eventId: eventId,
        },
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'ASC',
        },
      });
      return entities;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
