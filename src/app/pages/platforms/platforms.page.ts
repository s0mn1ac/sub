/* Angular */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

/* RxJs */
import { Observable } from 'rxjs';

/* NgRx */
import { AppState } from 'src/app/state/app.state';
import { selectSubsDataLoading, selectUserDataLoading } from 'src/app/state/selectors/loading.selectors';
import { Store } from '@ngrx/store';

/* Others */
import { CurrencyCodeRecord } from 'currency-codes';
import * as _ from 'lodash';
import * as cc from 'currency-codes';
import * as moment from 'moment';

/* Services */
import { StorageService } from 'src/app/shared/services/storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { TranslocoService } from '@ngneat/transloco';

/* Models */
import { PlatformPlan } from 'src/app/shared/models/platform-plan.model';
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';

/* Constants */
import { copiedToClipboard } from 'src/app/shared/constants/codes.constants';
import { SUBSCRIPTION_PLATFORMS } from 'src/assets/data/subscription-platforms.constants';
import { PlatformsService } from 'src/app/shared/services/platforms.service';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrls: ['./platforms.page.scss'],
})
export class PlatformsPage {

  public platforms: SubscriptionPlatform[] = [];

  constructor(
    private platformsService: PlatformsService,
    private toastService: ToastService
  ) { }

  ionViewWillEnter(): void {
    this.platforms = this.platformsService.platforms;
  }

  public async generatePlatformsList(): Promise<void> {
    const platformsAsString: string = JSON.stringify(this.platforms);
    const replaceDoubleQuotes: string = _.replace(platformsAsString, /"/g, '\'');
    const replaceId: string = _.replace(replaceDoubleQuotes, /'id'/g, 'id');
    const replaceName: string = _.replace(replaceId, /'name'/g, 'name');
    const replaceLogo: string = _.replace(replaceName, /'logo'/g, 'logo');
    const replaceTextColor: string = _.replace(replaceLogo, /'textColor'/g, 'textColor');
    const replaceTheme: string = _.replace(replaceTextColor, /'theme'/g, 'theme');
    const replacePlans: string = _.replace(replaceTheme, /'plans'/g, 'plans');
    const replacePrice: string = _.replace(replacePlans, /'price'/g, 'price');
    const replaceIsDefault: string = _.replace(replacePrice, /'isDefault'/g, 'isDefault');
    const replaceType: string = _.replace(replaceIsDefault, /'type'/g, 'type');
    const replaceDayly: string = _.replace(replaceType, /type:'dayly'/g, 'type:PlanTypeEnum.dayly');
    const replaceWeekly: string = _.replace(replaceDayly, /type:'weekly'/g, 'type:PlanTypeEnum.weekly');
    const replaceMonthly: string = _.replace(replaceWeekly, /type:'monthly'/g, 'type:PlanTypeEnum.monthly');
    const replaceYearly: string = _.replace(replaceMonthly, /type:'yearly'/g, 'type:PlanTypeEnum.yearly');
    const platformsAsJSON: string = `export const SUBSCRIPTION_PLATFORMS: SubscriptionPlatform[] = ${replaceYearly};\n`;
    await navigator.clipboard.writeText(platformsAsJSON);
    this.toastService.throwSuccessToast(copiedToClipboard);
  }

}
