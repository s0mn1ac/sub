/* Angular */
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

/* RxJs */
import { Subscription } from 'rxjs';

/* Others */
import { CurrencyCodeRecord } from 'currency-codes';
import { orderBy, maxBy } from 'lodash';
import * as cc from 'currency-codes';

/* Services */
import { ToastService } from 'src/app/shared/services/toast.service';

/* Models */
import { PlatformPlan } from 'src/app/shared/models/platform-plan.model';
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';

/* Enums */
import { ModeEnum } from 'src/app/shared/enums/mode.enum';

/* Constants */
import { newPlatformAdded, platformDeleted, platformModified } from 'src/app/shared/constants/codes.constants';
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';
import { PlatformsService } from 'src/app/shared/services/platforms.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.page.html',
  styleUrls: ['./platform.page.scss'],
})
export class PlatformPage implements OnInit {

  public platformForm: FormGroup;

  public platforms: SubscriptionPlatform[] = [];
  public subscriptionPlatform: SubscriptionPlatform = new SubscriptionPlatform();
  public platformPlans: PlatformPlan[] = [];
  public currencies: CurrencyCodeRecord[] = [];

  public planTypeEnum: typeof PlanTypeEnum = PlanTypeEnum;
  public modeEnum: typeof ModeEnum = ModeEnum;

  public mode: ModeEnum;

  public _nextPlatformId: number = 0;
  public _nextPlanId: number = 0;

  private params: Subscription;

  private id: number;

  constructor(
    private platformsService: PlatformsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.platforms = this.platformsService.platforms;
    this.currencies = orderBy(cc.data, 'currency');
  }

  get nextPlatformId() {
    return this._nextPlatformId;
  }

  set nextPlatformId(nextPlatformId: number) {
    this._nextPlatformId = nextPlatformId;
  }

  get nextPlanId() {
    return this._nextPlanId;
  }

  set nextPlanId(nextPlanId: number) {
    this._nextPlanId = nextPlanId;
  }

  get plansGroup(): FormArray {
    return this.platformForm.get('plans') as FormArray;
  }

  ngOnInit() {
    this.initParamsSubscription();
  }

  ngOnDestroy(): void {
    this.params?.unsubscribe();
  }

  public savePlatform(): void {
    if (this.mode === ModeEnum.new) {
      this.platformsService.addPlatform(new SubscriptionPlatform(this.platformForm.value));
      this.router.navigate(['/platforms']);
      this.toastService.throwSuccessToast(newPlatformAdded);
    } else {
      this.platformsService.modifyPlatform(this.id, new SubscriptionPlatform(this.platformForm.value));
      this.router.navigate(['/platforms']);
      this.toastService.throwSuccessToast(platformModified);
    }
  }

  public deletePlatform(): void {
    this.platformsService.removePlatform(this.id);
    this.router.navigate(['/platforms']);
    this.toastService.throwSuccessToast(platformDeleted);
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

  private initParamsSubscription(): void {
    this.params = this.activatedRoute.params.subscribe((params: Params) => this.initPage(params.id ? parseInt(params.id, 10) : undefined));
  }

  private initPage(id: number | undefined): void {
    this.id = id;
    const selectedPlatform: SubscriptionPlatform | undefined = this.platforms.find((platform: SubscriptionPlatform) => platform.id === id);
    this.mode = selectedPlatform === undefined ? ModeEnum.new : ModeEnum.modify;
    this.generateNextPlatformId();
    this.generateNextPlanId();
    this.initForm(selectedPlatform);
    this.refreshPlansIndex();
  }

  private initForm(platform: SubscriptionPlatform | undefined): void {
    this.platformForm = new FormGroup({
      id: new FormControl(platform ? platform.id : this.nextPlatformId, Validators.compose([Validators.required, Validators.nullValidator])),
      name: new FormControl(platform ? platform.name : null, Validators.compose([Validators.required, Validators.nullValidator, Validators.maxLength(75)])),
      logo: new FormControl(platform ? platform.logo : 'card-outline'),
      color: new FormControl(platform ? platform.theme : 'violet'),
      textColor: new FormControl(platform ? platform.textColor : 'white'),
      plans: new FormArray(platform ? platform.plans.map(plan => this.getPlanAsFormGroup(plan)) : [this.getPlanAsFormGroup()], Validators.compose([Validators.required, Validators.nullValidator]))
    });
  }

  private setValue(name: string, value: any): void {
    this.platformForm.get(name).setValue(value);
  }

  private generateNextPlatformId(): void {
    if (this.mode === ModeEnum.modify) {
      return;
    }
    const lastId: number = maxBy(this.platforms.filter(platform => platform.id !== 199999999), 'id').id;
    this.nextPlatformId = lastId + 1;
  }

  private generateNextPlanId(): void {
    if (this.mode === ModeEnum.modify) {
      return;
    }
    const lastPlatform: SubscriptionPlatform = maxBy(this.platforms.filter(platform => platform.id !== 199999999), 'id');
    const lastId: number = maxBy(lastPlatform.plans, 'id').id;
    this.nextPlanId = lastId + 1;
  }

  private refreshPlansIndex(): void {
    if (this.mode === ModeEnum.modify) {
      return;
    }
    this.generateNextPlanId();
    this.plansGroup.controls.forEach((control: AbstractControl) => {
      control.get('id').setValue(this.nextPlanId);
      this.nextPlanId = this.nextPlanId + 1;
    });
  }

  private getPlanAsFormGroup(plan: PlatformPlan | undefined = undefined): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: plan ? plan.id : new Date().getTime(), disabled: false }, Validators.compose([Validators.required])),
      name: new FormControl({ value: plan ? plan.name : null, disabled: false }, Validators.compose([Validators.required, Validators.nullValidator, Validators.maxLength(75)])),
      price: new FormControl({ value: plan ? plan.price : 0, disabled: false }, Validators.compose([Validators.required, Validators.nullValidator])),
      isDefault: new FormControl({ value: plan ? plan.isDefault : false, disabled: false }, Validators.compose([Validators.required, Validators.nullValidator])),
      type: new FormControl({ value: plan ? plan.type : PlanTypeEnum.monthly, disabled: false }, Validators.compose([Validators.required, Validators.nullValidator]))
    })
  }

  public addPlan(plan: PlatformPlan | undefined = undefined): void {
    this.plansGroup.push(this.getPlanAsFormGroup(plan));
    this.refreshPlansIndex();
  }

  public removePlan(index: number): void {
    this.plansGroup.removeAt(index);
    this.refreshPlansIndex();
  }

}
