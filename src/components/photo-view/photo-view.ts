import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'photo-view',
  templateUrl: 'photo-view.html'
})
export class PhotoViewComponent {

  url: string;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.url = navParams.get('url');
  }

  close(){
    this.viewCtrl.dismiss()
  }
}
