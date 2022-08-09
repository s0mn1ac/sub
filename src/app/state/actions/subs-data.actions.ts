/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Models */
import { Sub } from 'src/app/shared/models/sub.model';
import { SubsData } from 'src/app/shared/models/subs-data.model';

/* Constants */
import { StateConstants } from 'src/app/shared/constants/state.constants';

export const initSubsData = createAction(
    StateConstants.SUBS_DATA_INIT_SUBS_DATA,
    props<{ subsData: SubsData }>()
);

export const addSub = createAction(
    StateConstants.SUBS_DATA_ADD_SUB,
    props<{ sub: Sub }>()
);

export const modifySub = createAction(
    StateConstants.SUBS_DATA_MODIFY_SUB,
    props<{ id: number, sub: Sub }>()
);

export const deleteSub = createAction(
    StateConstants.SUBS_DATA_DELETE_SUB,
    props<{ id: number }>()
);
