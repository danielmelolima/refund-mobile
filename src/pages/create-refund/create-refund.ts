import { Component } from '@angular/core';
import { expenseOptions } from '../../utils/options-constants';
import { ToastProvider } from '../../providers/toast/toast';
import { ExpenseProvider } from '../../providers/expense/expense';
import { NavParams, NavController, Keyboard } from 'ionic-angular';
import * as moment from 'moment'
import { AlertProvider } from '../../providers/alert/alert';

@Component({
  selector: 'page-create-refund',
  templateUrl: 'create-refund.html',
})
export class CreateRefundPage {
  public expenseOptions = expenseOptions
  public expense: any = {}
  public expenseListName: string
  public expenseIndex: number

  constructor(
    private navCtrl: NavController,
    private expenseProvider: ExpenseProvider, 
    private toastProvider: ToastProvider,
    public navParams: NavParams,
    private alertProvider: AlertProvider,
    private keyboard: Keyboard
  ){
    this.expenseListName = this.navParams.get("listName")
    this.expenseIndex = this.navParams.get("index")
    this.setLastDate()
    this.getExpenseToEdit()
  }
 
  isValidExpense(): boolean{
    return (this.expense.date && this.expense.type 
      && this.expense.price && this.expense.couponPhoto)
  }

  saveExpense(){
    if(!this.isValidExpense()) return
    this.expense.date = moment(this.expense.date).format("DD/MM/YYYY")
    this.expense.price = this.unmaskPrice(this.expense.price)
    this.expenseProvider.saveExpense(this.expense, this.expenseIndex);
    this.expenseProvider.setLastDate(this.expense.date)
    this.resetInputs()
    this.toastProvider.show("Despesa adicionada")
  }

  async setLastDate(){
    const lastDate = await this.expenseProvider.getLastDate()
    if(lastDate){
      this.expense.date = moment(lastDate, "DD/MM/YYYY").format("YYYY-MM-DD")
    }
  }

  async getExpenseToEdit(){
    if(this.isEdit()){
      this.expense = await this.expenseProvider.getExpenseByMonthAndIndex(this.expenseListName, this.expenseIndex)
      this.expense.date = moment(this.expense.date, "DD/MM/YYYY").format("YYYY-MM-DD")
    }
  }

  deleteExpense(){
    this.alertProvider.showConfirm("Deseja deletar o registro?", () => {
      this.expenseProvider.deleteExpense(this.expense, this.expenseIndex)
      this.toastProvider.show("Registro deletado com sucesso")
      this.navCtrl.pop()
    })
  }

  isEdit(): boolean{
    return (this.expenseListName && (this.expenseIndex != null))
  }

  unmaskPrice(formatedPrice: string): string {
    let newRpice = `${formatedPrice}`.replace(/[^0-9,]/g,'')
    newRpice = `${newRpice}`.replace(',','.')
    return parseFloat(newRpice).toFixed(2)
  }

  resetInputs() {
    this.expense = {
      date: null,
      type: '',
      price: '',
      justification: ''
    };
    this.setLastDate()
  }

  isShowButtons(): boolean{
    return !this.keyboard.isOpen()
  }
}
