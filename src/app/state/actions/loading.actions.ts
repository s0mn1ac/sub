/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Constants */
import { StateConstants } from 'src/app/shared/constants/state.constants';

export const setSubsDataLoading = createAction(
    StateConstants.LOADING_SET_SUBS_DATA_LOADING,
    props<{ loading: boolean }>()
);

export const setUserDataLoading = createAction(
    StateConstants.LOADING_SET_USER_DATA_LOADING,
    props<{ loading: boolean }>()
);
