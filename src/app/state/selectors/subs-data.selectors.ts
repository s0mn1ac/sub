/* NgRx */
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

/* Interfaces */
import { SubsDataState } from 'src/app/shared/interfaces/subs-data-state.interface';

export const selectSubsDataState = (state: AppState) => state.subsData;

export const selectSubsData = createSelector(
  selectSubsDataState,
  (state: SubsDataState) => state.subsData
);

export const selectSubs = createSelector(
  selectSubsDataState,
  (state: SubsDataState) => state.subsData.subs
);
