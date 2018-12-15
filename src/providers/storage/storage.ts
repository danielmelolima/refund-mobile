import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {
  constructor(private storage: Storage) {}

  set(key: string, value: any){
    // localStorage.setItem(key, JSON.stringify(value))
    this.storage.set(key, value);
  }

  async get(key: string): Promise<any> {
    // try{
    //   return JSON.parse(localStorage.getItem(key))
    // }catch(e){
    //   return null
    // }
    return await this.storage.get(key)
  }
}