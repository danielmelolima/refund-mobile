import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';

@Injectable()
export class ConfigProvider {

  private KEY_CONFIG = 'refund_config'

  constructor(public storageProvider: StorageProvider) {
    
  }

  isValid(config: any): boolean{
    return ( config.project && config.client && config.consultant && config.email && config.url)
  }

  save(config: any){
    this.storageProvider.set(this.KEY_CONFIG, config)
  }

  async getConfigStorage(): Promise<any>{
    return await this.storageProvider.get(this.KEY_CONFIG)
  }

  async isValidStorage(): Promise<boolean> {
    const config = await this.getConfigStorage()
    return config ? this.isValid(config) : false
  }

  async getUrl() : Promise<any>{
    const config = await this.getConfigStorage()
    return config ? config.url : null
  }
}