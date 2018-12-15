import { Component } from '@angular/core';
import { Keyboard } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  config: any = {}

  constructor(
    private keyboard: Keyboard, 
    private configProvider: ConfigProvider,
    private toastProvider: ToastProvider
    
    ) {
    this.getConfig()
  }

  isShowButtons(): boolean{
    return !this.keyboard.isOpen()
  }

  saveConfig(){
    this.configProvider.save(this.config)
    this.toastProvider.show('Configuração salva com sucesso')
  }

  isValid(): boolean {
    return this.configProvider.isValid(this.config)
  }

  async getConfig(){
    const configStorage = await this.configProvider.getConfigStorage()
    if(configStorage) this.config = configStorage
  }

}
