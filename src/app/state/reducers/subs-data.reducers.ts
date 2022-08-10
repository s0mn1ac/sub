/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { addSub, deleteSub, initSubsData, modifySub } from '../actions/subs-data.actions';

/* Interfaces */
import { SubsDataState } from 'src/app/shared/interfaces/subs-data-state.interface';

/* Models */
import { SubsData } from 'src/app/shared/models/subs-data.model';
import { Sub } from 'src/app/shared/models/sub.model';

export const initialState: SubsDataState = {
  subsData: new SubsData()
};

export const subsDataReducer = createReducer(
  initialState,
  on(initSubsData, (state, action) => {
    return { ...state, subsData: action.subsData };
  }),
  on(addSub, (state, action) => {
    return { ...state, subsData: { ...state.subsData, subs: [...state.subsData.subs, action.sub] } };
  }),
  on(modifySub, (state, action) => {
    return { ...state, subsData: { ...state.subsData, subs: 
      state.subsData.subs.map((sub: Sub) =>
        sub.id === action.id
          ? {
            ...sub,
            name: action.sub.name,
            description: action.sub.description,
            logo: action.sub.logo,
            color: action.sub.color,
            textColor: action.sub.textColor,
            platform: action.sub.platform,
            plan: action.sub.plan,
            type: action.sub.type,
            every: action.sub.every,
            firstPayment: action.sub.firstPayment,
            price: action.sub.price,
            currency: action.sub.currency
          }
          : sub
      )
    }};
  }),
  on(deleteSub, (state, action) => {
    return { ...state, subsData: { ...state.subsData, subs: state.subsData.subs.filter((sub: Sub) => sub.id !== action.id) } };
  })
);
