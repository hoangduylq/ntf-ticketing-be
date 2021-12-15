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
import { BankDto } from '../dto/bank.dto';
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

  @Patch('bank/:userId')
  async updateBank(@Param('userid') userId: string, @Body() bankDto: BankDto) {
    try {
      return this.bankService.update(userId, bankDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('bank/:userId')
  async getBank(@Param('userid') userId: string) {
    try {
      return this.bankService.find(userId);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('bank/:userId')
  async removeBank(@Param('userid') userId: string) {
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

  @Patch('wallet/:userId')
  async updateWallet(
    @Param('userid') userId: string,
    @Body() walletDto: WalletDto,
  ) {
    try {
      return this.walletService.update(userId, walletDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('wallet/:userId')
  async getWallet(@Param('userid') userId: string) {
    try {
      return this.walletService.find(userId);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('wallet/:userId')
  async removeWallet(@Param('userid') userId: string) {
    return this.walletService.delete(userId);
  }
}
