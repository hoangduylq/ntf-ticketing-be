import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from './../../user/services/user.service';
import { BankEntity } from '../domain/entities/bank.entity';
import { BankDto } from '../dto/bank.dto';
import { BankRepository } from '../infrastructure/bank.repository';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(BankRepository)
    private bankRespository: BankRepository,
    private readonly userService: UserService,
  ) {}

  async create(bankDto: BankDto): Promise<boolean> {
    try {
      const { userId } = bankDto;
      const user = await this.userService.getUserById(userId);
      if (user) {
        const newBank = await this.bankRespository.create(bankDto);
        await this.bankRespository.save(newBank);
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async update(userId: string, bankDto: BankDto): Promise<boolean> {
    try {
      const { name, cardHolderName, creditNumber } = bankDto;
      const user = await this.userService.getUserById(userId);
      if (user) {
        await this.bankRespository.update(
          {
            userId: userId,
          },
          {
            name,
            cardHolderName,
            creditNumber,
          },
        );
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async find(userId: string): Promise<BankEntity> {
    const entity = await this.bankRespository.findOne({ userId: userId });
    return entity;
  }

  async delete(userId: string): Promise<boolean> {
    try {
      await this.bankRespository.delete({ userId: userId });
      return true;
    } catch (error) {
      return false;
    }
  }
}
