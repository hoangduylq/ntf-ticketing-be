import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BankUpdateDto } from '../dto/bank-update.dto';
import { BankDto } from '../dto/bank.dto';
import { WalletUpdateDto } from '../dto/wallet-update.dto';
import { WalletDto } from '../dto/wallet.dto';
import { BankService } from '../services/bank.service';
import { WalletService } from '../services/wallet.service';

@Controller('payment')
@ApiTags('payment')
export class PaymentController {
  constructor(
    private readonly bankService: BankService,
    private readonly walletService: WalletService,
  ) {}

  @Post('bank')
  async createBank(@Body() bankDto: BankDto) {
    try {
      return this.bankService.create(bankDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/bank/:userId')
  async updateBank(
    @Param('userId') userId: string,
    @Body() bankUpdateDto: BankUpdateDto,
  ) {
    try {
      return this.bankService.update(userId, bankUpdateDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/bank/:userId')
  async getBank(@Param('userId') userId: string) {
    try {
      return this.bankService.find(userId);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/bank/:userId')
  async removeBank(@Param('userId') userId: string) {
    return this.bankService.delete(userId);
  }

  @Post('wallet')
  async createWallet(@Body() walletDto: WalletDto) {
    try {
      return this.walletService.create(walletDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/wallet/:userId')
  async updateWallet(
    @Param('userId') userId: string,
    @Body() walletUpdateDto: WalletUpdateDto,
  ) {
    try {
      return this.walletService.update(userId, walletUpdateDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/wallet/:userId')
  async getWallet(@Param('userId') userId: string) {
    try {
      return this.walletService.find(userId);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/wallet/:userId')
  async removeWallet(@Param('userId') userId: string) {
    return this.walletService.delete(userId);
  }
}
