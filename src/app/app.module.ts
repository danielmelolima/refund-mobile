import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { LoadingProvider } from '../providers/loading/loading';
import { StorageProvider } from '../providers/storage/storage';
import { CreateRefundPage } from '../pages/create-refund/create-refund';
import { ComponentsModule } from '../components/components.module';
import { PhotoProvider } from '../providers/photo/photo';
import { ToastProvider } from '../providers/toast/toast';
import { ExpenseProvider } from '../providers/expense/expense';
import { RefundProvider } from '../providers/refund/refund';
import { RefundMonthPage } from '../pages/refund-month/refund-month';
import { ModalProvider } from '../providers/modal/modal';
import { AlertProvider } from '../providers/alert/alert';
import { RequestProvider } from '../providers/request/request';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { ConfigProvider } from '../providers/config/config';
import { ConfigPage } from '../pages/config/config';

registerLocaleData(localePt);
moment.locale('pt-BR');

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateRefundPage,
    RefundMonthPage,
    ConfigPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__refund_db',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateRefundPage,
    RefundMonthPage,
    ConfigPage
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt"
    },
    
    HttpClient,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoadingProvider,
    StorageProvider,
    PhotoProvider,
    Camera,
    ToastProvider,
    ExpenseProvider,
    RefundProvider,
    ModalProvider,
    AlertProvider,
    RequestProvider,
    ConfigProvider,
  ]
})
export class AppModule {}
