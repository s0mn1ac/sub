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

/* Models */
import { Sub } from 'src/app/shared/models/sub.model';
import { UserData } from 'src/app/shared/models/user-data.model';

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

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initStoreSelectors();
  }

  private initStoreSelectors(): void {
    this.subs$ = this.store.select(selectSubs);
    this.userData$ = this.store.select(selectUserData);
    this.subsDataLoading$ = this.store.select(selectSubsDataLoading);
    this.userDataLoading$ = this.store.select(selectUserDataLoading);
  }

}
