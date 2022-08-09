/* NgRx */
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

/* Interfaces */
import { LoadingState } from 'src/app/shared/interfaces/loading-state.interface';

export const selectLoadingState = (state: AppState) => state.loading;

export const selectSubsDataLoading = createSelector(
  selectLoadingState,
  (state: LoadingState) => state.isLoadingSubsData
);

export const selectUserDataLoading = createSelector(
  selectLoadingState,
  (state: LoadingState) => state.isLoadingUserData
);
