import { Component, Input } from '@angular/core';


@Component({
  selector: 'refund-card',
  templateUrl: 'card.html'
})
export class CardComponent {
  
  @Input() header: string
  @Input() content: string
  
  constructor() {
  
  }

}
