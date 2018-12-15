import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { IonicModule } from 'ionic-angular';
import { InputDateComponent } from './input-date/input-date';
import { InputComponent } from './input/input';
import { SelectComponent } from './select/select';
import { InputCurrencyComponent } from './input-currency/input-currency';
import { PhotoComponent } from './photo/photo';
import { ButtonComponent } from './button/button';
import { PhotoViewComponent } from './photo-view/photo-view';
import { CardComponent } from './card/card';
import { RefundMonthActionsComponent } from './refund-month-actions/refund-month-actions';
import { RefundMonthReportComponent } from './refund-month-report/refund-month-report';
import { RefundMonthExpensesComponent } from './refund-month-expenses/refund-month-expenses';
import { ChartComponent } from './chart/chart';

@NgModule({
	declarations: [
        HeaderComponent,
        InputDateComponent,
        InputComponent,
        SelectComponent,
        InputCurrencyComponent,
        PhotoComponent,
        ButtonComponent,
        PhotoViewComponent,
    CardComponent,
    RefundMonthActionsComponent,
    RefundMonthReportComponent,
    RefundMonthExpensesComponent,
    ChartComponent
    ],
	imports: [IonicModule],
	exports: [
        HeaderComponent,
        InputDateComponent,
        InputComponent,
        SelectComponent,
        InputCurrencyComponent,
        PhotoComponent,
        ButtonComponent,
        PhotoViewComponent,
    CardComponent,
    RefundMonthActionsComponent,
    RefundMonthReportComponent,
    RefundMonthExpensesComponent,
    ChartComponent
    ],entryComponents: [
        HeaderComponent,
        InputDateComponent,
        InputComponent,
        SelectComponent,
        InputCurrencyComponent,
        PhotoComponent,
        ButtonComponent,
        PhotoViewComponent
    ]
})
export class ComponentsModule {}
