/* NgRx */
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

/* Interfaces */
import { UserDataState } from 'src/app/shared/interfaces/user-data-state.interface';

export const selectUserDataState = (state: AppState) => state.userData;

export const selectUserData = createSelector(
  selectUserDataState,
  (state: UserDataState) => state.userData
);

export const selectLanguage = createSelector(
  selectUserDataState,
  (state: UserDataState) => state.userData?.language
);

export const selectShowMoreInfo = createSelector(
  selectUserDataState,
  (state: UserDataState) => state.userData?.showMoreInfo
);

export const selectTheme = createSelector(
  selectUserDataState,
  (state: UserDataState) => state.userData?.theme
);
