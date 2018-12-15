import { Component, Input } from '@angular/core';

@Component({
  selector: 'refund-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input() public title
  constructor() {
    
  }

}
