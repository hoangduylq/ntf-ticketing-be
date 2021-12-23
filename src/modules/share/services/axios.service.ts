import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AxiosService {
  axiosTatum = async (ENDPOINT, METHOD) => {
    const options = {
      url: `${process.env.TATUM_API_URL}${ENDPOINT}`,
      method: METHOD,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${process.env.TATUM_API_KEY}`,
      },
    };

    const response = await axios(options);
    return response.data;
  };
}
