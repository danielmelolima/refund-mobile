import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateRefundPage } from '../../pages/create-refund/create-refund';


@Component({
  selector: 'refund-month-expenses',
  templateUrl: 'refund-month-expenses.html'
})
export class RefundMonthExpensesComponent {

  @Input() expenses: Array<any> = []
  @Input() listName: string
  
  constructor(public navCtrl: NavController) {
   
  }

  goToEditExpense(index){
    this.navCtrl.push(CreateRefundPage, {listName: this.listName, index: index})
  }

  getUrlPicture(photo): string{
    return `data:image/jpeg;base64,${photo}`
  }
}