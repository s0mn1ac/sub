/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { initUserData, setCurrency, setLanguage, setShowMoreInfo, setTheme } from '../actions/user-data.actions';

/* Interfaces */
import { UserDataState } from 'src/app/shared/interfaces/user-data-state.interface';

export const initialState: UserDataState = {
  userData: undefined
};

export const userDataReducer = createReducer(
  initialState,
  on(initUserData, (state, action) => {
    return { ...state, userData: action.userData };
  }),
  on(setLanguage, (state, action) => {
    return { ...state, userData: { ...state.userData, language: action.language }, loading: false };
  }),
  on(setShowMoreInfo, (state, action) => {
    return { ...state, userData: { ...state.userData, showMoreInfo: action.showMoreInfo }, loading: false };
  }),
  on(setTheme, (state, action) => {
    return { ...state, userData: { ...state.userData, theme: action.theme }, loading: false };
  }),
  on(setCurrency, (state, action) => {
    return { ...state, userData: { ...state.userData, currency: action.currency }, loading: false };
  })
);
