import { Injectable } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Injectable()
export class ModalProvider {

  constructor(public modalCtrl: ModalController) {
  }

  show(component, params){
    this.modalCtrl.create(component, params).present()
  }
}
