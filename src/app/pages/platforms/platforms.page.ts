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

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.page.html',
  styleUrls: ['./platforms.page.scss'],
})
export class PlatformsPage implements OnInit {

  public subsDataLoading$: Observable<boolean> = new Observable<boolean>();
  public userDataLoading$: Observable<boolean> = new Observable<boolean>();

  public platformsForm: FormGroup;

  public subscriptionPlatforms: SubscriptionPlatform[] = [];
  public platformPlans: PlatformPlan[] = [];
  public currencies: CurrencyCodeRecord[] = [];

  public subscriptionPlatformsAsJSON: string;

  public isModalOpen: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private store: Store<AppState>,
    private toastService: ToastService
  ) {
    this.subscriptionPlatforms = SUBSCRIPTION_PLATFORMS;
    this.currencies = _.orderBy(cc.data, 'currency');
  }

  ngOnInit() {
    this.initStoreSelectors();
    this.initForm();
  }

  public async generatePlatformsList(): Promise<void> {
    // this.isModalOpen = true;
    const platformsAsString: string = JSON.stringify(this.subscriptionPlatforms);
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
    const replaceDayly: string = _.replace(replaceType, /'dayly'/g, 'PlanTypeEnum.dayly');
    const replaceWeekly: string = _.replace(replaceDayly, /'weekly'/g, 'PlanTypeEnum.weekly');
    const replaceMonthly: string = _.replace(replaceWeekly, /'monthly'/g, 'PlanTypeEnum.monthly');
    const replaceYearly: string = _.replace(replaceMonthly, /'yearly'/g, 'PlanTypeEnum.yearly');
    this.subscriptionPlatformsAsJSON = `export const SUBSCRIPTION_PLATFORMS: SubscriptionPlatform[] = ${replaceYearly};\n`;
    await navigator.clipboard.writeText(this.subscriptionPlatformsAsJSON);
    this.toastService.throwSuccessToast(copiedToClipboard);
  }

  private initStoreSelectors(): void {
    this.subsDataLoading$ = this.store.select(selectSubsDataLoading);
    this.userDataLoading$ = this.store.select(selectUserDataLoading);
  }

  private initForm(): void {
    this.platformsForm = new FormGroup({
      // TODO: ¿Hace falta?
    });
  }

}
