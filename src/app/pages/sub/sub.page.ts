import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';
import { PlatformPlan } from 'src/app/shared/models/platform-plan.model';
import { SubscriptionOptionsService } from 'src/app/shared/services/subscription-options.service';
import { Sub } from 'src/app/shared/models/sub.model';
import { StorageService } from 'src/app/shared/services/storage.service';
import { ModeEnum } from 'src/app/shared/enums/mode.enum';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.page.html',
  styleUrls: ['./sub.page.scss'],
})
export class SubPage implements OnInit, OnDestroy {

  public subForm: FormGroup;

  public sub: Sub;

  public subscriptionPlatforms: SubscriptionPlatform[] = [];
  public platformPlans: PlatformPlan[] = [];

  public planTypeEnum: typeof PlanTypeEnum = PlanTypeEnum;
  public modeEnum: typeof ModeEnum = ModeEnum;

  public mode: ModeEnum;

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

  ngOnInit(): void {
    this.sub = new Sub();
    this.initParamsSubscription();
  }

  ngOnDestroy(): void {
    this.params$?.unsubscribe();
    this.platform$?.unsubscribe();
    this.plan$?.unsubscribe();
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
    this.mode = id !== undefined ? ModeEnum.modify : ModeEnum.new;
    this.id = id;
    this.initForm();
    this.initFormSubscriptions();
    this.subscriptionPlatforms = await this.subscriptionOptionsService.getSubscriptionPlatforms();
    const sub: Sub | undefined = id !== undefined ? this.storageService.getSubById(id) : undefined;
    this.setFormValues(sub);
  }

  private initForm(): void {
    this.subForm = new FormGroup({
      price: new FormControl(0, Validators.compose([Validators.required, Validators.nullValidator, Validators.min(0)])),
      name: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator, Validators.maxLength(75)])),
      platform: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator])),
      plan: new FormControl({ value: null, disabled: true }, Validators.compose([Validators.required, Validators.nullValidator])),
      type: new FormControl({ value: null, disabled: true }, Validators.compose([Validators.required, Validators.nullValidator]))
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
    this.setValue('price', sub.price);
    this.setValue('name', sub.name);
  }

  private initFormSubscriptions(): void {

    this.platform$ = this.subForm.get('platform').valueChanges
      .subscribe((platform: SubscriptionPlatform) => {
        this.platformPlans = platform.plans;
        this.setValue('name', this.translocoService.translate(`subscriptionPlatform.${platform.name}`));
        this.setValue('plan', platform.plans.find((plan: PlatformPlan) => plan.isDefault));
        this.setDisabledState('type', false);
        this.setDisabledState('plan', false);
      });

    this.plan$ = this.subForm.get('plan').valueChanges
      .subscribe((plan: PlatformPlan) => {
        this.setValue('price', plan.price);
        this.setValue('type', plan.type);
      });
  }

  private setValue(name: string, value: any): void {
    this.subForm.get(name).setValue(value);
  }

  private setDisabledState(name: string, isDisabled: boolean): void {
    this.subForm.get(name)[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }

}
