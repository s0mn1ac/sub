/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

/* NgRx */
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectUserData } from 'src/app/state/selectors/user-data.selectors';
import { selectSubs } from 'src/app/state/selectors/subs-data.selectors';
import { selectSubsDataLoading, selectUserDataLoading } from 'src/app/state/selectors/loading.selectors';
import { addSub, deleteSub, modifySub } from 'src/app/state/actions/subs-data.actions';
import { setCurrency } from 'src/app/state/actions/user-data.actions';

/* Others */
import { Observable, Subscription } from 'rxjs';
import { Moment } from 'moment';
import { CurrencyCodeRecord } from 'currency-codes';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as cc from 'currency-codes';

/* Services */
import { TranslocoService } from '@ngneat/transloco';
import { StorageService } from 'src/app/shared/services/storage.service';

/* Models */
import { Sub } from 'src/app/shared/models/sub.model';
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';
import { PlatformPlan } from 'src/app/shared/models/platform-plan.model';
import { UserData } from 'src/app/shared/models/user-data.model';

/* Enums */
import { ModeEnum } from 'src/app/shared/enums/mode.enum';
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';

/* Data */
import { DEFAULT_SUBSCRIPTION_PLATFORM_ID, SUBSCRIPTION_PLATFORMS } from 'src/assets/data/subscription-platforms.constants';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.page.html',
  styleUrls: ['./sub.page.scss'],
})
export class SubPage implements OnInit, OnDestroy {

  public subsDataLoading$: Observable<boolean> = new Observable<boolean>();
  public userDataLoading$: Observable<boolean> = new Observable<boolean>();

  public subForm: FormGroup;

  public sub: Sub;

  public currencies: CurrencyCodeRecord[] = [];

  public subscriptionPlatforms: SubscriptionPlatform[] = [];
  public platformPlans: PlatformPlan[] = [];

  public planTypeEnum: typeof PlanTypeEnum = PlanTypeEnum;
  public modeEnum: typeof ModeEnum = ModeEnum;

  public mode: ModeEnum;

  private params: Subscription;
  private plan: Subscription;
  private platform: Subscription;
  private subsData: Subscription;
  private userData: Subscription;

  private id: number | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private store: Store<AppState>
  ) {
    this.subscriptionPlatforms = SUBSCRIPTION_PLATFORMS;
    this.currencies = _.orderBy(cc.data, 'currency');
  }

  ngOnInit(): void {
    this.initStoreSelectors();
    this.initParamsSubscription();
  }

  ngOnDestroy(): void {
    this.params?.unsubscribe();
    this.plan?.unsubscribe();
    this.platform?.unsubscribe();
    this.subsData?.unsubscribe();
    this.userData?.unsubscribe();
  }

  public onChangeCurrency(event: any): void {
    const currency: string = event.detail.value;
    this.store.dispatch(setCurrency({ currency }))
    this.storageService.setCurrency(currency);
  }

  public onChangeLogo(icon: string): void {
    this.setValue('logo', icon);
  }

  public onChangeColor(color: string): void {
    this.setValue('color', color);
  }

  public onChangeTextColor(color: string): void {
    this.setValue('textColor', color);
  }

  public onClickAddNewSub(): void {
    const sub: Sub = new Sub(this.subForm.value);
    this.store.dispatch(addSub({ sub }))
    this.storageService.addSub(sub);
    this.router.navigate(['/board']);
  }

  public onClickModifySub(): void {
    const sub: Sub = new Sub(this.subForm.value);
    this.store.dispatch(modifySub({ id: this.id, sub }))
    this.storageService.modifySub(this.id, sub);
    this.router.navigate(['/board']);
  }

  public onClickDeleteSub(): void {
    this.store.dispatch(deleteSub({ id: this.id }))
    this.storageService.deleteSub(this.id);
    this.router.navigate(['/board']);
  }

  private initStoreSelectors(): void {
    this.subsDataLoading$ = this.store.select(selectSubsDataLoading);
    this.userDataLoading$ = this.store.select(selectUserDataLoading);
  }

  private initStoreSubscriptions(): void {

    this.userData = this.store.select(selectUserData).subscribe((userData: UserData) => {
      if (userData !== undefined && userData !== null) {
        this.setValue('currency', userData.currency)
      }
    });

    this.subsData = this.store.select(selectSubs).subscribe((subs: Sub[]) => {
      setTimeout(() => {
        if (this.id !== undefined) {
          const sub: Sub | undefined = subs.find((subToFind: Sub) => subToFind.id === this.id) ?? undefined;
          this.setFormValues(sub);
        } else {
          const defaultSubscriptionPlatform: SubscriptionPlatform = this.subscriptionPlatforms.find((platform: SubscriptionPlatform) =>
            platform.id === DEFAULT_SUBSCRIPTION_PLATFORM_ID);
          this.setValue('platform', defaultSubscriptionPlatform);
          this.setValue('name', this.translocoService.translate('subscriptionPlatform.newSubscription'));
        }
      }, 10);
    });
  }

  private initParamsSubscription(): void {
    this.params = this.activatedRoute.params.subscribe((params: Params) => this.initPage(params.id ? parseInt(params.id, 10) : undefined));
  }

  private async initPage(id: number): Promise<void> {
    this.mode = id !== undefined ? ModeEnum.modify : ModeEnum.new;
    this.id = id;
    this.initForm();
    this.initFormSubscriptions();
    this.initStoreSubscriptions();
  }

  private initForm(): void {
    const today: Moment = moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY');
    this.subForm = new FormGroup({
      price: new FormControl(0, Validators.compose([Validators.required, Validators.nullValidator, Validators.min(0)])),
      currency: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator, Validators.min(0)])),
      name: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator, Validators.maxLength(75)])),
      platform: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator])),
      plan: new FormControl({ value: null, disabled: true }, Validators.compose([Validators.required, Validators.nullValidator])),
      type: new FormControl(PlanTypeEnum.monthly, Validators.compose([Validators.required, Validators.nullValidator])),
      every: new FormControl(1, Validators.compose([Validators.required, Validators.nullValidator, Validators.min(1)])),
      firstPayment: new FormControl(today.format('YYYY-MM-DD'), Validators.compose([Validators.required, Validators.nullValidator])),
      logo: new FormControl('help-circle-outline'),
      color: new FormControl('violet'),
      textColor: new FormControl('white')
    });
  }

  private async setFormValues(sub: Sub | undefined): Promise<void> {
    if (sub === undefined) {
      return;
    }
    this.sub = sub;
    const subscriptionPlatform: SubscriptionPlatform = this.subscriptionPlatforms.find(platform => platform.id === sub.platform.id);
    const platformPlan: PlatformPlan = subscriptionPlatform.plans.find(plan => plan.id === sub.plan.id);
    this.setValue('platform', subscriptionPlatform);
    this.setValue('plan', platformPlan);
    this.setValue('type', sub.type);
    this.setValue('every', sub.every);
    this.setValue('type', sub.type);
    this.setValue('firstPayment', sub.firstPayment);
    this.setValue('price', sub.price);
    this.setValue('currency', sub.currency);
    this.setValue('name', sub.name);
    this.setValue('logo', sub.logo);
    this.setValue('color', sub.color);
    this.setValue('textColor', sub.textColor);
  }

  private initFormSubscriptions(): void {

    this.platform = this.subForm.get('platform').valueChanges
      .subscribe((platform: SubscriptionPlatform) => {
        this.platformPlans = platform.plans;
        this.setValue('name', this.translocoService.translate(`subscriptionPlatform.${platform.name}`));
        this.setValue('plan', platform.plans.find((plan: PlatformPlan) => plan.isDefault));
        this.setValue('logo', platform.logo);
        this.setValue('color', platform.theme);
        this.setValue('textColor', platform.textColor);
        this.setDisabledState('plan', false);
      });

    this.plan = this.subForm.get('plan').valueChanges
      .subscribe((plan: PlatformPlan) => {
        this.setValue('price', plan.price);
        if (plan.type === PlanTypeEnum.daily
          || plan.type === PlanTypeEnum.weekly
          || plan.type === PlanTypeEnum.monthly
          || plan.type === PlanTypeEnum.yearly) {
            this.setValue('type', plan.type);
        }
      });
  }

  private setValue(name: string, value: any): void {
    this.subForm.get(name).setValue(value);
  }

  private setDisabledState(name: string, isDisabled: boolean): void {
    this.subForm.get(name)[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }

}
