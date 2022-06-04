/* Angular */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* Services */
import { BaseService } from 'src/app/shared/services/base.service';

/* Models */
import { SubscriptionPlatform } from '../models/subscription-platform.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionOptionsService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  public async getSubscriptionPlatforms(): Promise<SubscriptionPlatform[]> {
    return await this.getSubscriptionPlatformsReport() as SubscriptionPlatform[];
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------

  private async getSubscriptionPlatformsReport(): Promise<any> {
    return this.serviceGet({
      url: 'assets/data/subscription-platforms.json',
      callback: (response: any) => response.body,
      result: null
    });
  }

}
