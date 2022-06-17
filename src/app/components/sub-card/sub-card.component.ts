import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';
import { PlatformPlan } from 'src/app/shared/models/platform-plan.model';
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';

@Component({
  selector: 'app-sub-card',
  templateUrl: './sub-card.component.html',
  styleUrls: ['./sub-card.component.scss'],
})
export class SubCardComponent implements OnInit {

  @Input() name: string;
  @Input() platform: SubscriptionPlatform;
  @Input() plan: PlatformPlan;
  @Input() type: PlanTypeEnum;
  @Input() firstPayment: string;
  @Input() price: number;
  @Input() currency: string;

  constructor(
    private translocoService: TranslocoService
  ) { }

  get language(): string {
    return this.translocoService.getActiveLang();
  }

  ngOnInit(): void {
    //
  }

}
