import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PhotoProvider } from '../../providers/photo/photo';
import { ModalProvider } from '../../providers/modal/modal';
import { PhotoViewComponent } from '../photo-view/photo-view';

@Component({
  selector: 'refund-photo',
  templateUrl: 'photo.html'
})
export class PhotoComponent {
  @Input() public value
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>()
  
  constructor(
    private photoProvider: PhotoProvider, 
    private modalProvider: ModalProvider
  ) {}

  getPhoto(){
    this.photoProvider.getPicture().then(res => {
      this.value = res;
      this.valueChange.emit(this.value)
    }).catch(error => {})
  }

  getUrlPicture(): string{
    return `data:image/jpeg;base64,${this.value}`
  }

  showPhoto(){
    this.modalProvider.show(PhotoViewComponent, { url: this.getUrlPicture() })
  }
}
