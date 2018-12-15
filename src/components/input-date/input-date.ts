import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'refund-input-date',
  templateUrl: 'input-date.html'
})
export class InputDateComponent {
  @Input() label: string = "Data";
  @Input() value;
  @Input() disabled: boolean = false
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>()

  updateValue(){
    this.valueChange.emit(this.value)
  }
}