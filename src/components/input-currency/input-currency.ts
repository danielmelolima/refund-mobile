import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'refund-input-currency',
  templateUrl: 'input-currency.html'
})
export class InputCurrencyComponent {
  private formatter: any
  @Input() label: string
  @Input() value: string
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>()

  constructor(){
    this.formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
  }

  ngOnInit(){
    if(this.value){
      this.valueChange.emit(this.mask(this.value))
    }
  }

  updateValue(){
    this.valueChange.emit(this.mask(this.value))
  }

  private mask(value): string {
    const unmaskedNumber = this.unmask(value)
    return this.formatter.format(unmaskedNumber)
  }

  private unmask(value){
    let newValue = `${value}`.replace(/[^0-9]/g,'')
    return (parseFloat(`${newValue}`)/100).toFixed(2)
  }
}