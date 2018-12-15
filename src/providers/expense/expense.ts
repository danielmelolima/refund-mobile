import { Injectable } from '@angular/core'
import * as moment from 'moment'
import { RefundProvider } from '../refund/refund'
import { StorageProvider } from '../storage/storage';

@Injectable()
export class ExpenseProvider {
  private KEY_LAST_DATE = 'refund_expense_last_date'

  constructor(
    private refundProvider: RefundProvider,
    private storageProvider: StorageProvider
    ) {
  }

  async saveExpense(expense: any, index?: number) {
    let allLists = await this.refundProvider.getRefundsObject()
    const listName = this.getListNameByDate(expense)
    let listByExpense = allLists[`${listName}`]
    if(!listByExpense){
      allLists[`${listName}`] = [expense]
    }else{
      if(index != null){
        allLists[`${listName}`][index] = expense
      }else{
        allLists[`${listName}`].push(expense)
      }
      allLists[`${listName}`].sort( (e1, e2) => moment(e1.date, "DD/MM/YYYY").diff(moment(e2.date, "DD/MM/YYYY")))
    }
    this.refundProvider.saveRefundsList(allLists)
  }

  getListNameByDate(expense: any){
    let name = moment(expense.date, "DD/MM/YYYY").format("MMMM/YYYY")
    if(name === 'Invalid date'){
      name = moment(expense.date, "YYYY-MM-DD").format("MMMM/YYYY")
    }
    return name
  }

  async getListByDate(listName: string): Promise<Array<any>>{
    const allLists = await this.refundProvider.getRefundsObject()
    return allLists[`${listName}`]
  }

  async getExpenseByMonthAndIndex(listName: string, index: number): Promise<any>{
    const allLists = await this.refundProvider.getRefundsObject()
    return allLists[`${listName}`][index]
  }

  async deleteExpense(expense: any, index: number){
    let allLists = await this.refundProvider.getRefundsObject()
    const listName = this.getListNameByDate(expense)
    allLists[`${listName}`].splice(index, 1);
    if( allLists[`${listName}`].length === 0){
      delete allLists[`${listName}`]
    }
    this.refundProvider.saveRefundsList(allLists)
  }

  async getReport(listName: string): Promise<any>{
    const expenses = await this.getListByDate(listName)
    let totalValue = 0
    let totalValueByType: any = {}
    const quantity = expenses.length
    expenses.forEach(expense => {
      totalValue += parseFloat(expense.price)
      if(!totalValueByType[`${expense.type}`]){
        totalValueByType[`${expense.type}`] = 0
      }
      let price: number = parseFloat(totalValueByType[`${expense.type}`])
      price += parseFloat(expense.price)
      totalValueByType[`${expense.type}`] = price.toFixed(2)
    })
    return {totalValue, totalValueByType, quantity}
  }

  setLastDate(date){
    this.storageProvider.set(this.KEY_LAST_DATE, date)
  }

  getLastDate(){
    return this.storageProvider.get(this.KEY_LAST_DATE)
  }
}