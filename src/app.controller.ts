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
  async nameList(@Param('username') name:string){
      let userdata = this.dbservice.find(name);
      console.log(userdata);
      return await JSON.stringify(userdata);
  }
  @Get('/:id')
  async dataId(@Param('id') id:string){
    let userdata = this.dbservice.find(id);
    return await userdata;
  }
  @Put('/id/add/token')
  async addToken(@Param('/id/add/token') username:string){
    const params = username.split('/');
    let id = params[0];
    let token = params[2];
    this.dbservice.updateWithId(id,token);
    return await 'Update Successful';
  }

}
