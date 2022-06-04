/* Angular */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Services */
import { BaseService } from 'src/app/shared/services/base.service';

/* Models */
import { SubscriptionOption } from '../models/subscription-option.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionOptionsService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  public async getSubscriptionOptions(): Promise<SubscriptionOption[]> {
    return await this.getSubscriptionOptionsReport() as SubscriptionOption[];
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private async getSubscriptionOptionsReport(): Promise<any> {
    return this.serviceGet({
      url: 'assets/data/subscription-options.json',
      callback: (response: any) => response.body,
      result: null
    });
  }

}
