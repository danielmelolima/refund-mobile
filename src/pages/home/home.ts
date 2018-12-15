import { Component } from '@angular/core';
import { RefundProvider } from '../../providers/refund/refund';
import { NavController } from 'ionic-angular';
import { RefundMonthPage } from '../refund-month/refund-month';
import { CreateRefundPage } from '../create-refund/create-refund';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public refunds: Array<any> = []  
  constructor(
    private refundProvider: RefundProvider, 
    public navCtrl: NavController) {
  }

  ionViewWillEnter(){
    this.getRefundsList()
  }

  async getRefundsList(){
    this.refunds = await this.refundProvider.getRefundsList()
  }

  goToMonthRefunds(listName){
    this.navCtrl.push(RefundMonthPage, {listName: listName})
  }

  goToCreateExpense(){
    this.navCtrl.push(CreateRefundPage)
  }
}
