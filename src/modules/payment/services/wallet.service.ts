import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from '../domain/entities/wallet.entity';
import { WalletDto } from '../dto/wallet.dto';
import { WalletRepository } from '../infrastructure/wallet.entity';
import { UserService } from './../../user/services/user.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletRepository)
    private walletRespository: WalletRepository,
    private readonly userService: UserService,
  ) {}

  async create(walletDto: WalletDto): Promise<boolean> {
    try {
      const { userId } = walletDto;
      const user = await this.userService.getUserById(userId);
      if (user) {
        const newWallet = await this.walletRespository.create(walletDto);
        await this.walletRespository.save(newWallet);
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async update(userId: string, walletDto: WalletDto): Promise<boolean> {
    try {
      const { walletAddress } = walletDto;
      const user = await this.userService.getUserById(userId);
      if (user) {
        await this.walletRespository.update(
          {
            userId: userId,
          },
          {
            walletAddress,
          },
        );
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async find(userId: string): Promise<WalletEntity> {
    const entity = await this.walletRespository.findOne({ userId: userId });
    return entity;
  }

  async delete(userId: string): Promise<boolean> {
    try {
      await this.walletRespository.delete({ userId: userId });
      return true;
    } catch (error) {
      return false;
    }
  }
}
