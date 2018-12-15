import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class LoadingProvider {

  private loading : Loading;
  private count: number = 0;

  constructor(public loadingCtrl: LoadingController) {}

  public show(text: string = "Carregando..."){
    if(this.count === 0) {
      this.loading = this.loadingCtrl.create({
        content: text
      });
      this.loading.present();
    }
    this.count++;
  }

  public hide(){
    this.count--;
    if(this.count === 0){
      this.loading.dismiss();
    }
  }
}