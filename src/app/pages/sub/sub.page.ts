import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
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

  private params$: Subscription;
  private platform$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private subscriptionOptionsService: SubscriptionOptionsService
  ) { }

  ngOnInit(): void {
    this.initParamsSubscription();
  }

  ngOnDestroy(): void {
    this.params$?.unsubscribe();
    this.platform$?.unsubscribe();
  }

  private initParamsSubscription(): void {
    this.params$ = this.activatedRoute.params.subscribe((params: Params) => this.initSubPage(params.id));
  }

  private async initSubPage(id: string): Promise<void> {
    console.log(id);
    if (id === undefined) {
      // return;
    }
    this.subscriptionOptions = await this.subscriptionOptionsService.getSubscriptionOptions();
    this.initForm();
    this.initFormSubscriptions();
  }

  private initForm(): void {
    this.subForm = new FormGroup({
      name: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator, Validators.maxLength(75)])),
      platform: new FormControl(null, Validators.compose([Validators.required, Validators.nullValidator])),
      plan: new FormControl({ value: null, disabled: true }, Validators.compose([Validators.required, Validators.nullValidator]))
    });
  }

  private initFormSubscriptions(): void {
    this.platform$ = this.subForm.get('platform').valueChanges
      .subscribe((subscriptionOption: SubscriptionOption) => {
        if (!subscriptionOption.hasPlans) {
          this.setDisabledState('plan', true);
          return;
        }
        this.subscriptionPlanOptions = subscriptionOption.plans;
        this.setValue('plan', subscriptionOption.plans.find((plan: SubscriptionPlan) => plan.isDefault));
        this.setDisabledState('plan', false);
      });
  }

  private setValue(name: string, value: any): void {
    this.subForm.get(name).setValue(value);
  }

  private setDisabledState(name: string, isDisabled: boolean): void {
    this.subForm.get(name)[isDisabled ? 'disable' : 'enable']();
  }

}
