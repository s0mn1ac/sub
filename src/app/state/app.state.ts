/* NgRx */
import { ActionReducerMap } from "@ngrx/store";
import { loadingReducer } from "./reducers/loading.reducers";
import { subsDataReducer } from "./reducers/subs-data.reducers";
import { userDataReducer } from "./reducers/user-data.reducers";

/* Interfaces */
import { LoadingState } from "../shared/interfaces/loading-state.interface";
import { SubsDataState } from "../shared/interfaces/subs-data-state.interface";
import { UserDataState } from "../shared/interfaces/user-data-state.interface";

export interface AppState {
  loading: LoadingState,
  subsData: SubsDataState,
  userData: UserDataState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  loading: loadingReducer,
  subsData: subsDataReducer,
  userData: userDataReducer
};
