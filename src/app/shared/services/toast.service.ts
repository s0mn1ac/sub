/* Angular */
import { Injectable } from '@angular/core';

/* Ionic */
import { ToastController } from '@ionic/angular';

/* Services */
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController,
    private translocoService: TranslocoService
  ) { }

  public async throwSuccessToast(successCode: string): Promise<void> {
    const message: string = this.translocoService.translate(`codes.success.${successCode}`);
    const toast = await this.toastController.create({ message, duration: 1000, color: 'success', mode: 'ios', icon: 'checkmark-outline' });
    await toast.present();
  }

  public async throwWarningToast(warningCode: string): Promise<void> {
    const message: string = this.translocoService.translate(`codes.warning.${warningCode}`);
    const toast = await this.toastController.create({ message, duration: 1000, color: 'warning', mode: 'ios', icon: 'alert-outline' });
    await toast.present();
  }

  public async throwErrorToast(errorCode: string): Promise<void> {
    const message: string = this.translocoService.translate(`codes.error.${errorCode}`);
    const toast = await this.toastController.create({ message, duration: 1000, color: 'danger', mode: 'ios', icon: 'close-outline' });
    await toast.present();
  }

}
