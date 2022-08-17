/* Angular */
import { Component, Input } from '@angular/core';

/* Services */
import { TranslocoService } from '@ngneat/transloco';

/* Models */
import { Plan } from 'src/app/shared/models/plan.model';
import { Platform } from 'src/app/shared/models/platform.model';

/* Enums */
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';

@Component({
  selector: 'app-sub-card',
  templateUrl: './sub-card.component.html',
  styleUrls: ['./sub-card.component.scss'],
})
export class SubCardComponent {

  @Input() name: string;
  @Input() platform: Platform;
  @Input() plan: Plan;
  @Input() type: PlanTypeEnum;
  @Input() firstPayment: string;
  @Input() price: number;
  @Input() currency: string;
  @Input() logo: string;
  @Input() color: string;
  @Input() textColor: string;
  @Input() every: number;
  @Input() showMoreInfo: boolean = true;

}
