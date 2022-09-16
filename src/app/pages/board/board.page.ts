/* Angular */
import { Component, OnInit } from '@angular/core';

/* NgRx */
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectSubsDataLoading, selectUserDataLoading } from 'src/app/state/selectors/loading.selectors';
import { selectSubs } from 'src/app/state/selectors/subs-data.selectors';
import { selectUserData } from 'src/app/state/selectors/user-data.selectors';

/* Others */
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { Moment } from 'moment';

/* Models */
import { Sub } from 'src/app/shared/models/sub.model';
import { UserData } from 'src/app/shared/models/user-data.model';

/* Enums */
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {

  public subs$: Observable<Sub[]> = new Observable<Sub[]>();
  public userData$: Observable<UserData> = new Observable<UserData>();

  public subsDataLoading$: Observable<boolean> = new Observable<boolean>();
  public userDataLoading$: Observable<boolean> = new Observable<boolean>();

  public totalPerMonth: number = 0;
  public totalPerYear: number = 0;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initStoreSelectors();
    this.initStoreSubscriptions();
  }

  private initStoreSelectors(): void {
    this.subs$ = this.store.select(selectSubs);
    this.userData$ = this.store.select(selectUserData);
    this.subsDataLoading$ = this.store.select(selectSubsDataLoading);
    this.userDataLoading$ = this.store.select(selectUserDataLoading);
  }

  private initStoreSubscriptions(): void {
    this.subs$.pipe().subscribe((subs: Sub[]) => this.updateTotal(subs));
  }

  private updateTotal(subs: Sub[]): void {

    let total: number = 0;
    const today: Moment = moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY');
    const todayMonth: string = today.format('MM');
    const daysInMonth: number = today.daysInMonth();

    subs?.forEach((sub: Sub) => {
      switch (sub.type) {
        case PlanTypeEnum.daily:
          total = total + (sub.price * daysInMonth / sub.every);
          break;
        case PlanTypeEnum.weekly:
          total = total + (sub.price * daysInMonth / (7 * sub.every));
          break;
        case PlanTypeEnum.monthly:
          total = total + sub.price;
          break;
        case PlanTypeEnum.yearly:
          total = todayMonth === moment(sub.firstPayment, 'DD/MM/YYYY').format('MM') ? total + sub.price : total;
          break;
        default:
          break;
      }
    });

    this.totalPerMonth = total;
    this.totalPerYear = total * 12;
  }

}
