import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { SubscriptionTypeEnum } from 'src/app/shared/enums/subscription-type.enum';
import { SubscriptionOption } from 'src/app/shared/models/subscription-option.model';
import { SubscriptionPlan } from 'src/app/shared/models/subscription-plan.model';
import { SubscriptionOptionsService } from 'src/app/shared/services/subscription-options.service';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.page.html',
  styleUrls: ['./sub.page.scss'],
})
export class SubPage implements OnInit, OnDestroy {

  public subForm: FormGroup;

  public subscriptionOptions: SubscriptionOption[] = [];
  public subscriptionPlanOptions: SubscriptionPlan[] = [];

  public subscriptionTypeEnum: typeof SubscriptionTypeEnum = SubscriptionTypeEnum;

  private params$: Subscription;
  private platform$: Subscription;
  private plan$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translocoService: TranslocoService,
    private subscriptionOptionsService: SubscriptionOptionsService
  ) { }

  ngOnInit(): void {
    this.initParamsSubscription();
  }

  ngOnDestroy(): void {
    this.params$?.unsubscribe();
    this.platform$?.unsubscribe();
    this.plan$?.unsubscribe();
  }

  private initParamsSubscription(): void {
    this.params$ = this.activatedRoute.params.subscribe((params: Params) => this.initSubPage(params.id));
  }

  private async initSubPage(id: string): Promise<void> {
    this.initForm();
    this.initFormSubscriptions();
    this.subscriptionOptions = await this.subscriptionOptionsService.getSubscriptionOptions();
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

  private initFormSubscriptions(): void {

    this.platform$ = this.subForm.get('platform').valueChanges
      .subscribe((subscriptionOption: SubscriptionOption) => {
        this.subscriptionPlanOptions = subscriptionOption.plans;
        this.setValue('name', this.translocoService.translate(`subscriptionOptions.${subscriptionOption.name}`));
        this.setValue('plan', subscriptionOption.plans.find((plan: SubscriptionPlan) => plan.isDefault));
        this.setDisabledState('type', false);
        this.setDisabledState('plan', false);
      });

    this.plan$ = this.subForm.get('plan').valueChanges
      .subscribe((subscriptionPlan: SubscriptionPlan) => {
        this.setValue('price', subscriptionPlan.price);
        this.setValue('type', subscriptionPlan.type);
      });
  }

  private setValue(name: string, value: any): void {
    this.subForm.get(name).setValue(value);
  }

  private setDisabledState(name: string, isDisabled: boolean): void {
    this.subForm.get(name)[isDisabled ? 'disable' : 'enable']({ emitEvent: false });
  }

}
