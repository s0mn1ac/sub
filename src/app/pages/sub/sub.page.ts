/* Angular */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

/* Others */
import { Subscription } from 'rxjs';
import { Moment } from 'moment';
import { CurrencyCodeRecord } from 'currency-codes';
import * as moment from 'moment';
import * as cc from 'currency-codes';

/* Services */
import { TranslocoService } from '@ngneat/transloco';
import { StorageService } from 'src/app/shared/services/storage.service';
import { SubscriptionOptionsService } from 'src/app/shared/services/subscription-options.service';

/* Models */
import { Sub } from 'src/app/shared/models/sub.model';
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';
import { PlatformPlan } from 'src/app/shared/models/platform-plan.model';

/* Enums */
import { ModeEnum } from 'src/app/shared/enums/mode.enum';
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';
import { UserData } from 'src/app/shared/models/user-data.model';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.page.html',
  styleUrls: ['./sub.page.scss'],
})
export class SubPage implements OnInit, OnDestroy {

  public subForm: FormGroup;

  public sub: Sub;

  public currencies: CurrencyCodeRecord[] = [];

  public subscriptionPlatforms: SubscriptionPlatform[] = [];
  public platformPlans: PlatformPlan[] = [];

  public planTypeEnum: typeof PlanTypeEnum = PlanTypeEnum;
  public modeEnum: typeof ModeEnum = ModeEnum;

  public mode: ModeEnum;

  public isLoading: boolean = true;

  private params$: Subscription;
  private platform$: Subscription;
  private plan$: Subscription;

  private id: number | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translocoService: TranslocoService,
    private storageService: StorageService,
    private subscriptionOptionsService: SubscriptionOptionsService
  ) { }

  async ngOnInit(): Promise<void> {
    this.sub = new Sub();
    this.initParamsSubscription();
  }

  ngOnDestroy(): void {
    this.params$?.unsubscribe();
    this.platform$?.unsubscribe();
    this.plan$?.unsubscribe();
  }

  public onChangeCurrency(event: any): void {
    const userData: UserData = this.storageService.userData;
    userData.currency = event.detail.value;
    this.storageService.userData = userData;
  }

  public onClickAddNewSub(): void {
    const sub: Sub = new Sub(this.subForm.value);
    this.storageService.addNewSub(sub);
    this.router.navigate(['/board']);
  }

  public onClickModifySub(): void {
    const sub: Sub = new Sub(this.subForm.value);
    this.storageService.modifySub(this.id, sub);
    this.router.navigate(['/board']);
  }

  public onClickDeleteSub(): void {
    this.storageService.deleteSub(this.id);
    this.router.navigate(['/board']);
  }

  private initParamsSubscription(): void {
    this.params$ = this.activatedRoute.params.subscribe((params: Params) => this.initPage(params.id ? parseInt(params.id, 10) : undefined));
  }

  private async initPage(id: number): Promise<void> {
    this.setLoading(true);
    await this.storageService.retrieveUserData();
    this.mode = id !== undefined ? ModeEnum.modify : ModeEnum.new;
    this.id = id;
    this.initForm();
    this.initFormSubscriptions();
    this.currencies = cc.data;
    this.subscriptionPlatforms = await this.subscriptionOptionsService.getSubscriptionPlatforms();
    const sub: Sub | undefined = id !== undefined ? this.storageService.getSubById(id) : undefined;
    this.setFormValues(sub);
    this.setLoading(false);
  }

  private initForm(): void {
    const userData: UserData = this.storageService.userData;
    const today: Moment = moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY');
    this.subForm = new FormGroup({
      price: new FormControl(0, Validators.compose([Validators.required, Validators.nullValidator, Validators.min(0)])),
      currency: new FormControl(userData.currency, Validators.compose([Validators.required, Validators.nullValidator, Validators.min(0)])),
      name: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator, Validators.maxLength(75)])),
      platform: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator])),
      plan: new FormControl({ value: null, disabled: true }, Validators.compose([Validators.required, Validators.nullValidator])),
      type: new FormControl(PlanTypeEnum.monthly, Validators.compose([Validators.required, Validators.nullValidator])),
      every: new FormControl(1, Validators.compose([Validators.required, Validators.nullValidator, Validators.min(1)])),
      firstPayment: new FormControl(today.format('YYYY-MM-DD'), Validators.compose([Validators.required, Validators.nullValidator])),
      logo: new FormControl('help-circle-outline')
    });
  }

  private setFormValues(sub: Sub | undefined): void {
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
  }

  private initFormSubscriptions(): void {

    this.platform$ = this.subForm.get('platform').valueChanges
      .subscribe((platform: SubscriptionPlatform) => {
        this.platformPlans = platform.plans;
        this.setValue('name', this.translocoService.translate(`subscriptionPlatform.${platform.name}`));
        this.setValue('plan', platform.plans.find((plan: PlatformPlan) => plan.isDefault));
        this.setValue('logo', platform.logo);
        this.setDisabledState('plan', false);
      });

    this.plan$ = this.subForm.get('plan').valueChanges
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

  private setLoading(value: boolean): void {
    this.isLoading = value;
  }

}
