import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class WalletDto {
  @ApiProperty()
  userId?: string;

  @ApiProperty()
  @IsNotEmpty()
  walletAddress!: string;
}
