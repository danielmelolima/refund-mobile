import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'refund-select',
  templateUrl: 'select.html'
})
export class SelectComponent {
  @Input() label: string
  @Input() value
  @Input() options: Array<any> = []
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>()

  updateValue(){
    this.valueChange.emit(this.value)
  }
}