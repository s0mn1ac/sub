/* Angular */
import { Injectable } from '@angular/core';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { initUserData } from '../actions/user-data.actions';
import { setUserDataLoading } from '../actions/loading.actions';

/* Others */
import { map } from 'rxjs/operators';

@Injectable()
export class UserDataEffects {

  initUserData$ = createEffect(() => this.actions$.pipe(
    ofType(initUserData),
    map(() => setUserDataLoading({ loading: false }))
  ));

  constructor(
    private actions$: Actions
  ) { }

}
