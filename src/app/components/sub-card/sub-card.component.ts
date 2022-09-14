/* Angular */
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

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
export class SubCardComponent implements AfterViewInit {

  @Input() index: number = 1;
  @Input() origin: string;
  @Input() selectable: boolean = false;
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

  ngAfterViewInit(): void {
    this.toggleAnimation();
  }

  public getAnimationDelay(index: number): string {
    return `${index * 0.1}s`;
  }

  public toggleAnimation(): void {
    const subCard: HTMLElement = document.getElementById(`${this.origin}SubCardLayout${this.index}`);
    setTimeout(() => subCard.classList.remove('visible'), (this.index * 100) + 600);
    console.log('LOAD')
  }

}
