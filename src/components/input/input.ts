import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'refund-input',
  templateUrl: 'input.html'
})
export class InputComponent {
  @Input() type: string = 'text'
  @Input() label: string
  @Input() value: string
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>()

  updateValue(){
    this.valueChange.emit(this.value)
  }
}