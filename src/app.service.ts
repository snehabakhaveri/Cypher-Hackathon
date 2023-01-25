import { Injectable } from '@nestjs/common';
import { DbService } from './shared';
import {CoinGeckoClient} from 'coingecko-api-v3';
import {CoinGeckoList} from './dto/coingecko.dto';
@Injectable()
export class AppService {
  constructor(private readonly db: DbService) {}
  async getHello(): Promise<string> {
    const result = await this.db.create('vitalikWatchlist', ['matic-network']);
    return `Hello Wold! ${JSON.stringify(result)}`;
  }
  async ping() : Promise<any>{
    const client = new CoinGeckoClient({
      timeout :10000,
      autoRetry : true,
    });
    let data = await client.ping();
    return JSON.stringify(data);
  }

  async getcoinList(): Promise<any>{
    const client = new CoinGeckoClient({
      timeout :10000,
      autoRetry : true,
    });
    let coins = await client.coinList({'include_platform':true});
    return JSON.stringify(coins);
  }
  
  /*async getCoinList() : Promise<CoinGeckoList>{
    const client = new CoinGeckoClient({
      timeout :10000,
      autoRetry : true,
    });
    const data = await client.coinList();
  
  }*/

  
}
