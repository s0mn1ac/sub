/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Models */
import { UserData } from 'src/app/shared/models/user-data.model';

/* Enums */
import { LanguageEnum } from 'src/app/shared/enums/language.enum';
import { ThemeEnum } from 'src/app/shared/enums/theme.enum';

/* Constants */
import { StateConstants } from 'src/app/shared/constants/state.constants';

export const initUserData = createAction(
    StateConstants.USER_DATA_INIT_USER_DATA,
    props<{ userData: UserData }>()
);

export const setLanguage = createAction(
    StateConstants.USER_DATA_SET_LANGUAGE,
    props<{ language: LanguageEnum }>()
);

export const setShowMoreInfo = createAction(
    StateConstants.USER_DATA_SET_SHOW_MORE_INFO,
    props<{ showMoreInfo: boolean }>()
);

export const setTheme = createAction(
    StateConstants.USER_DATA_SET_THEME,
    props<{ theme: ThemeEnum }>()
);

export const setCurrency = createAction(
    StateConstants.USER_DATA_SET_CURRENCY,
    props<{ currency: string }>()
);
