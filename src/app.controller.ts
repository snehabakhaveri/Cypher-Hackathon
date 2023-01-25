import { Controller, Get,Param,Res } from '@nestjs/common';
import { Post, Put } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import {CoinGeckoList  } from './dto/coingecko.dto';
import {DbService} from './shared/db.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private dbservice: DbService) {}

  @Get()
  async getHello() {
    return await this.appService.ping();
    
  }
  @Get('/coinList')
  async getCoins(){
    return await this.appService.getcoinList();
  }
  @Get('/:username')
  async nameList(@Param() username:string){
      let userdata = this.dbservice.WatchLists.find({name:`${username}`})
      console.log(userdata);
      return JSON.stringify(userdata);
  }
  
}
