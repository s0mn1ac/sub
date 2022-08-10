/* Angular */
import { Component, Input } from '@angular/core';

/* Services */
import { TranslocoService } from '@ngneat/transloco';

/* Enums */
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';

@Component({
  selector: 'app-price-container',
  templateUrl: './price-container.component.html',
  styleUrls: ['./price-container.component.scss'],
})
export class PriceContainerComponent {

  @Input() showMoreInfo: boolean = true;
  @Input() type: PlanTypeEnum;
  @Input() price: number;
  @Input() currency: string;
  @Input() color: string;
  @Input() every: number;

  public planTypeEnum: typeof PlanTypeEnum = PlanTypeEnum;

  constructor(
    private translocoService: TranslocoService
  ) { }

  get language(): string {
    return this.translocoService.getActiveLang();
  }

}
