/* Angular */
import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';

/* RxJs */
import { Observable, Subject, takeUntil } from 'rxjs';

/* NgRx */
import { Store } from '@ngrx/store';
import { selectCurrency, selectTotalPeriod } from 'src/app/state/selectors/user-data.selectors';
import { setTotalPeriod } from 'src/app/state/actions/user-data.actions';

/* Services */
import { StorageService } from 'src/app/shared/services/storage.service';

/* Interfaces */
import { AppState } from 'src/app/state/app.state';

/* Enums */
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';

@Component({
  selector: 'app-total-counter',
  templateUrl: './total-counter.component.html',
  styleUrls: ['./total-counter.component.scss'],
})
export class TotalCounterComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() totalPerMonth: number;
  @Input() totalPerYear: number;

  public currency$: Observable<string> = new Observable<string>();
  public totalPeriod$: Observable<PlanTypeEnum> = new Observable<PlanTypeEnum>();

  public planTypeEnum: typeof PlanTypeEnum = PlanTypeEnum;

  private destroy$ = new Subject<boolean>();

  private totalPeriod: PlanTypeEnum;

  // @HostListener('window:resize')
  // onResize() {
  //   this.updateNavBarVisibility();
  // }

  constructor(
    private storageService: StorageService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.initStoreSelectors();
    this.initStoreSubscriptions();
  }

  ngAfterViewInit(): void {
    // this.updateNavBarVisibility();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onChangeTotalPeriod(): void {
    const totalPeriod: PlanTypeEnum = this.totalPeriod === PlanTypeEnum.monthly ? PlanTypeEnum.yearly : PlanTypeEnum.monthly;
    this.store.dispatch(setTotalPeriod({ totalPeriod }));
    this.storageService.setTotalPeriod(totalPeriod);
  }

  private initStoreSelectors(): void {
    this.currency$ = this.store.select(selectCurrency);
    this.totalPeriod$ = this.store.select(selectTotalPeriod);
  }

  private initStoreSubscriptions(): void {
    this.totalPeriod$
      .pipe(takeUntil(this.destroy$))
      .subscribe((totalPeriod: PlanTypeEnum) => this.totalPeriod = totalPeriod);
  }

  // private updateNavBarVisibility(): void {
  //   const buttonsContainer: HTMLElement | null = document.getElementById('navBarButtonsContainer');
  //   if (buttonsContainer === null) {
  //     return
  //   }
  //   if (buttonsContainer.offsetWidth <= 130 && !buttonsContainer.classList.contains('fab-group')) {
  //     buttonsContainer.classList.add('fab-group');
  //   } else if (buttonsContainer.offsetWidth > 130 && buttonsContainer.classList.contains('fab-group')) {
  //     buttonsContainer.classList.remove('fab-group');
  //   }
  // }

}
