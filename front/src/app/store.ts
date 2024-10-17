import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/store/auth.reducer';

export interface Store {
  auth: AuthState;
}

export const appStore: ActionReducerMap<Store> = {
  auth: authReducer,
};
