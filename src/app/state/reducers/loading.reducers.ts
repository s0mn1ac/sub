/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { setSubsDataLoading, setUserDataLoading } from '../actions/loading.actions';

/* Interfaces */
import { LoadingState } from 'src/app/shared/interfaces/loading-state.interface';

export const initialState: LoadingState = {
  isLoadingSubsData: true,
  isLoadingUserData: true
};

export const loadingReducer = createReducer(
  initialState,
  on(setSubsDataLoading, (state, action) => {
    return { ...state, isLoadingSubsData: action.loading };
  }),
  on(setUserDataLoading, (state, action) => {
    return { ...state, isLoadingUserData: action.loading };
  })
);
