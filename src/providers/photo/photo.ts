import { Injectable } from '@angular/core';
import { ActionSheetController, Platform } from 'ionic-angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';

@Injectable()
export class PhotoProvider {
  private promisseReject: any
  private promisseResolve: any

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private camera: Camera) {
  }

  getPicture() : Promise<any>{
    return new Promise((resolve, reject)=> {
      this.promisseResolve = resolve
      this.promisseReject = reject
      this.showOptions()
    });
  }

  private showOptions(){
    if(!this.platform.is('cordova')){
      this.promisseResolve('232323')
      return;
    }

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione sua foto',
      buttons: [
        {
          text: 'Abrir câmera',
          handler: () => {
            this.getCameraPicture();
          }
        },{
          text: 'Escolher foto da galeria',
          handler: () => {
            this.getAlbumPicture();
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.promisseResolve(null)
          }
        }
      ]
    });
    actionSheet.present();
  }

  private getCameraPicture(){
    this.camera.getPicture(this.getOptions(false)).then((imageData) => {
      const base64Image = imageData;
      this.camera.cleanup()
      this.promisseResolve(base64Image)
    }, (err) => { 
      this.promisseReject()
    });
  }

  private getAlbumPicture(){
    this.camera.getPicture(this.getOptions(true)).then((imageData) => {
      const base64Image = imageData;
      this.camera.cleanup()
      this.promisseResolve(base64Image)
    }, (err) => {
      this.promisseReject()
    });
  }

  private getOptions(isAlbum){
    const options: CameraOptions = {
      quality: 80,
      targetWidth: 500,
      targetHeight: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: isAlbum ? PictureSourceType.PHOTOLIBRARY : PictureSourceType.CAMERA
    }
    return options
  }
}