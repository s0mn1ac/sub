import { Component, Input, OnInit } from '@angular/core';
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';
import { PlatformPlan } from 'src/app/shared/models/platform-plan.model';
import { Sub } from 'src/app/shared/models/sub.model';
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';

@Component({
  selector: 'app-sub-card',
  templateUrl: './sub-card.component.html',
  styleUrls: ['./sub-card.component.scss'],
})
export class SubCardComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() name: string;
  @Input() platform: SubscriptionPlatform;
  @Input() plan: PlatformPlan;
  @Input() type: PlanTypeEnum;
  @Input() price: number;
  @Input() currency: string;

  constructor() { }

  ngOnInit(): void {
    //
  }

}
