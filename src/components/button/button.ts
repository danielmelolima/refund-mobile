import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'refund-button',
  templateUrl: 'button.html'
})
export class ButtonComponent {
  @Input() disabled: boolean = false
  @Input() color: string = 'primary'
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>() 

  emitClickEvent(){
    this.onClick.emit()
  }
}
