import { Component, Input } from '@angular/core';
import { ToastProvider } from '../../providers/toast/toast';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { RefundProvider } from '../../providers/refund/refund';
import { NavController } from 'ionic-angular';
import { CreateRefundPage } from '../../pages/create-refund/create-refund';
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'refund-month-actions',
  templateUrl: 'refund-month-actions.html'
})
export class RefundMonthActionsComponent {

  @Input() expenses: Array<any> = []
  @Input() listName: string

  constructor(
    public toastProvider: ToastProvider,
    private loadingProvider: LoadingProvider,
    private navCtrl: NavController,
    public refundProvider: RefundProvider,
    private alertProvider: AlertProvider,
    private configProvider: ConfigProvider
  ) { }

  send() {
    if (!this.configProvider.isValidStorage()) {
      this.toastProvider.show("Por favor, preencha os dados das configurações.")
      return;
    }

    this.alertProvider.showConfirm('Deseja enviar as despesas?', async () => {
      this.loadingProvider.show()
      const resp = await this.refundProvider.send({ expenses: this.expenses })
      resp.subscribe(res => {
        this.loadingProvider.hide()
        const message = 'Sucesso ao enviar as despesas'
        this.toastProvider.show(message)
      }, error => {
        this.loadingProvider.hide()
        const message = 'Ocorreu um erro'
        this.toastProvider.show(message)
      })
    })
  }

  delete() {
    this.alertProvider.showConfirm('Deseja deletar as desepesas?', () => {
      this.refundProvider.deleteRefund(this.listName)
      this.toastProvider.show("Sucesso ao deletar as despesas")
      this.navCtrl.popToRoot()
    })
  }

  goToCreateExpense() {
    this.navCtrl.push(CreateRefundPage)
  }
}