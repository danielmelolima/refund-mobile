import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import * as Chart from 'echarts'


@Component({
  selector: 'refund-chart',
  templateUrl: 'chart.html'
})
export class ChartComponent {

  @ViewChild('chartEl') chartEl: ElementRef;
  @Input() options: any

  ngOnInit() {
    this.initChart()
  }

  initChart() {
    const myChart = Chart.init(this.chartEl.nativeElement)
    myChart.setOption(this.options)
  }
}