import { Injectable } from '@nestjs/common';
import { Currency, generateFlowWallet } from '@tatumio/tatum';

export interface Wallet {
  mnemonic: string;
  xpub: string;
}

@Injectable()
export class TatumService {
  async generateWallet(mnem: string) {
    const wallet = await generateFlowWallet(Currency.FLOW);
    return wallet;
  }
}
