import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AxiosService } from './axios.service';
// import { generateFlowWallet } from '@tatumio/tatum';

export interface Wallet {
  mnemonic: string;
  xpub: string;
}

@Injectable()
export class TatumService {
  constructor(private axiosService: AxiosService) {}

  async generateFlowWallet() {
    const result = await this.axiosService.axiosTatum(`wallet`, 'GET');
    return result;
  }

  async generateAddress(xpub: string, index: number) {
    const result = await this.axiosService.axiosTatum(
      `address/${xpub}/${index}`,
      'GET',
    );
    return result.address;
  }

  async generatePrivateKey(mnemonic: string, index: number) {
    const result = await axios.post(
      `${process.env.TATUM_API_URL}/v3/flow/wallet/priv`,
      {
        mnemonic,
        index,
      },
      {
        headers: {
          'x-api-key': `${process.env.TATUM_API_KEY}`,
        },
      },
    );
    return result.data.key;
  }

  async getInfoAccount(address: string) {
    const result = await this.axiosService.axiosTatum(
      `account/${address}`,
      'GET',
    );
    return result;
  }

  async getCurrentBlock() {
    const result = await this.axiosService.axiosTatum(`/block/current`, 'GET');
    return result;
  }

  async deployFlowNft(privateKey: string, account: string) {
    const result = await axios.post(
      `${process.env.TATUM_API_URL}/v3/nft/deploy/`,
      {
        chain: 'FLOW',
        privateKey,
        account,
      },
      {
        headers: {
          'x-api-key': `${process.env.TATUM_API_KEY}`,
        },
      },
    );
    return result.data;
  }
}
