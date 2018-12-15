import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';
import { RequestProvider } from '../request/request';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';

@Injectable()
export class RefundProvider {

  private KEY_EXPENSES_LIST = 'refund_expenses_objects'
  constructor(
    private storageProvider: StorageProvider, 
    private requestProvider: RequestProvider,
    private configProvider: ConfigProvider
  ){}

  async getRefundsObject(): Promise<any> {
    const list = await this.storageProvider.get(this.KEY_EXPENSES_LIST)
    return list ? list : {}
  }

  async getRefundsList(): Promise<Array<any>> {
    let refunds = []
    const list = await this.getRefundsObject()
    const listProps = Object.keys(list)
    for (let prop of listProps) {
      if(list[`${prop}`] && !`${prop}`.startsWith('_')){
        refunds.push({
          listName: prop,
          quantity: list[`${prop}`].length
        });
      }
    }
    return refunds
  }

  saveRefundsList(list: Array<any>) {
    this.storageProvider.set(this.KEY_EXPENSES_LIST, list)
  }
  
  async send(req): Promise<Observable<any>> {
    const config = await this.configProvider.getConfigStorage()
    for(var k in config) req[k]=config[k]
    return this.requestProvider.post({object: req, path: 'v1/spreadsheet/send', context: config.url})
  }

  async deleteRefund(listName: string){
    let allList = await this.getRefundsObject()
    delete allList[`${listName}`]
    this.saveRefundsList(allList)
  }
}
