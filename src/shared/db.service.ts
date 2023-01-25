/* eslint-disable @typescript-eslint/no-var-requires */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';

@Injectable()
export class DbService {
  private WatchLists;
  constructor() {
    const dbLocal = require('db-local');
    const { Schema } = new dbLocal({ path: './databases' });
    this.WatchLists = Schema('WatchLists', {
      _id: { type: String, required: true },
      name: { type: String, default: 'Customer' },
      tokens: { type: Array, default: [] },
    });
  }

  async find(key: string) {
    const reqWList = this.WatchLists.find((obj: any) => {
      obj.name === key;
    });
    console.log(reqWList);
    return reqWList;
  }

  async create(name: string, data: Array<string>) {
    const res = this.WatchLists.create({
      _id: uuid(),
      name: name,
      tokens: data,
    }).save();
    return res;
  }

  async update(key: string, data: Array<string>) {
    const reqWList = this.WatchLists.find((obj: any) => {
      obj.name === key;
    });
    const updatedTokens = reqWList.tokens.concat(data);
    const res = reqWList.update({ tokens: updatedTokens }).save();
    return res;
  }

  async updateWithId(key: string, data: string) {
    const reqWList = this.WatchLists.find((obj: any) => {
      obj._id === key;
    });
    if (reqWList.includes(data)==false){
      const updatedTokens = reqWList.tokens.concat(data);
      const res = reqWList.update({ tokens: updatedTokens }).save();
      return await res;
    } 
  }
  async deleteWithId(key: string, data: string) {
    const reqWList = this.WatchLists.find((obj: any) => {
      obj._id === key;
    });
    if (reqWList.includes(data)==true){
      let index = reqWList.tokens.indexOf(data)
      const updatedTokens = reqWList.tokens.splice(index,1);
      const res = reqWList.update({ tokens: updatedTokens }).save();
      return await res;
    } 
  }
  async findWithId(key: string) {
    const reqWList = this.WatchLists.find((obj: any) => {
      obj._id === key;
    });
    console.log(reqWList);
    return await reqWList;
  }
}
