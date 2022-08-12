/* Angular */
import { Injectable } from '@angular/core';

/* Ionic */
import { ToastController } from '@ionic/angular';

/* Others */
import * as _ from 'lodash';

/* Services */
import { TranslocoService } from '@ngneat/transloco';
import { SUBSCRIPTION_PLATFORMS } from 'src/assets/data/subscription-platforms.constants';
import { SubscriptionPlatform } from '../models/subscription-platform.model';
import { PlatformPlan } from '../models/platform-plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  public _platforms: SubscriptionPlatform[] = [];

  constructor(
    private toastController: ToastController,
    private translocoService: TranslocoService
  ) {
    this._platforms = SUBSCRIPTION_PLATFORMS;
  }

  get platforms() {
    return this._platforms;
  }

  set platforms(platforms: SubscriptionPlatform[]) {
    this._platforms = platforms;
  }

  public addPlatform(platform: SubscriptionPlatform): void {
    this.platforms.push(platform);
    this.refreshIndex();
  }

  public modifyPlatform(id: number, platform: SubscriptionPlatform): void {
    const platformFound: SubscriptionPlatform = this.platforms.find((platformToFind: SubscriptionPlatform) => platformToFind.id === id);
    platformFound.name = platform.name;
    platformFound.logo = platform.logo;
    platformFound.textColor = platform.textColor;
    platformFound.theme = platform.theme;
    platformFound.plans = platform.plans;
    this.refreshIndex();
  }

  public removePlatform(id: number): void {
    this.platforms = this.platforms.filter((platform: SubscriptionPlatform) => platform.id !== id);
    this.refreshIndex();
  }

  private refreshIndex(): void {
    let platformIndex: number = 100000001;
    let planIndex: number = 200000001;
    let isAnyDefault: boolean = false;
    this.platforms.forEach((platform: SubscriptionPlatform) => {
      isAnyDefault = false;
      if (platform.id !== 199999999) {
        platform.id = platformIndex;
        platformIndex = platformIndex + 1;
      }
      platform.plans.forEach((plan: PlatformPlan) => {
        if (plan.id !== 299999999) {
          plan.id = planIndex;
          planIndex = planIndex + 1;
        }
        if (plan.isDefault) {
          isAnyDefault = true;
        }
      });
      if (!isAnyDefault) {
        platform.plans[0].isDefault = true;
      }
    });
    this.platforms = _.orderBy(this.platforms, 'id');
  }

}
