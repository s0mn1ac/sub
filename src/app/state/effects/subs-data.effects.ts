/* Angular */
import { Injectable } from '@angular/core';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { initSubsData } from '../actions/subs-data.actions';
import { setSubsDataLoading } from '../actions/loading.actions';

/* Others */
import { map } from 'rxjs/operators';

@Injectable()
export class SubsDataEffects {

  initSubsData$ = createEffect(() => this.actions$.pipe(
    ofType(initSubsData),
    map(() => setSubsDataLoading({ loading: false }))
  ));

  constructor(
    private actions$: Actions
  ) { }

}
