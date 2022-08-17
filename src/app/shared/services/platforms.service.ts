/* Angular */
import { Injectable } from '@angular/core';

/* Ionic */
import { ToastController } from '@ionic/angular';

/* Others */
import * as _ from 'lodash';

/* Services */
import { TranslocoService } from '@ngneat/transloco';
import { PLATFORMS } from 'src/assets/data/platforms.constants';
import { Platform } from '../models/platform.model';
import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  public _platforms: Platform[] = [];

  constructor(
    private toastController: ToastController,
    private translocoService: TranslocoService
  ) {
    this._platforms = PLATFORMS;
  }

  get platforms() {
    return this._platforms;
  }

  set platforms(platforms: Platform[]) {
    this._platforms = platforms;
  }

  public addPlatform(platform: Platform): void {
    this.platforms.push(platform);
    this.refreshIndex();
  }

  public modifyPlatform(id: number, platform: Platform): void {
    const platformFound: Platform = this.platforms.find((platformToFind: Platform) => platformToFind.id === id);
    platformFound.name = platform.name;
    platformFound.logo = platform.logo;
    platformFound.textColor = platform.textColor;
    platformFound.theme = platform.theme;
    platformFound.plans = platform.plans;
    this.refreshIndex();
  }

  public removePlatform(id: number): void {
    this.platforms = this.platforms.filter((platform: Platform) => platform.id !== id);
    this.refreshIndex();
  }

  private refreshIndex(): void {
    let platformIndex: number = 100000001;
    let planIndex: number = 200000001;
    let isAnyDefault: boolean = false;
    this.platforms.forEach((platform: Platform) => {
      isAnyDefault = false;
      if (platform.id !== 199999999) {
        platform.id = platformIndex;
        platformIndex = platformIndex + 1;
      }
      platform.plans.forEach((plan: Plan) => {
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
