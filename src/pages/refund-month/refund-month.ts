import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { ExpenseProvider } from '../../providers/expense/expense';

@Component({
  selector: 'page-refund-month',
  templateUrl: 'refund-month.html',
})
export class RefundMonthPage {
  public option: string = "actions"
  public listName: string
  public expenses: Array<any> = []
  
  constructor(
    public expenseProvider: ExpenseProvider,
    public navParams: NavParams) 
  {}

  async ionViewWillEnter(){
    this.listName = this.navParams.get("listName")
    this.expenses = await this.expenseProvider.getListByDate(this.listName)
  }
}