import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AlertProvider {

  constructor(public alertCtrl: AlertController) {
  }

  showAlert(message: string){
    this.alertCtrl.create({
      title: "Atenção",
      subTitle: message,
      buttons: ['OK']
    }).present()
  }

  showConfirm(message: string, callback: Function){
    this.alertCtrl.create({
      title: "Confirmação",
      message: message,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Confirmar',
          handler: () => callback()
        }
      ]
    }).present()
  }
}