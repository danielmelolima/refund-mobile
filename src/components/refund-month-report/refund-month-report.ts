import { Component, Input } from '@angular/core';
import { ExpenseProvider } from '../../providers/expense/expense';

@Component({
  selector: 'refund-month-report',
  templateUrl: 'refund-month-report.html'
})
export class RefundMonthReportComponent {

  @Input() listName: string
  public report: any = {}
  public chartOptions: any
  
  constructor(public expenseProvider: ExpenseProvider) {
  }

  ngOnInit(){
    this.getReport()
  }

  async getReport(){
    this.report = await this.expenseProvider.getReport(this.listName)
    this.createObjectChart()
  }

  createObjectChart(){
    const dataLegend = ['Transporte', 'Alimentação', 'Hotel', 'Telefone', 'Lavanderia', 'Outro']
    let dataSeries = []
    dataLegend.forEach( legend => {
      const value = this.report.totalValueByType[`${legend}`]
      if(value){
        dataSeries.push({
          value: value, name: legend
        })
      }
    })
    this.chartOptions = {
      title: {
        text: 'Relatório de gasto',
        subtext: 'Por tipo',
        x: 'right'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: dataLegend
      },
      series: [
        {
          name: 'Gastos',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: dataSeries,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }
}
