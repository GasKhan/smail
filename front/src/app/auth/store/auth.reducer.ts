import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailed,
  signUpFailed,
  signUpSuccess,
} from './auth.actions';
import { UserResp } from '../../models/user.model';

export type AuthState = {
  user: UserResp | null;
  signUpError: string | null;
  loginError: string | null;
};

const initialState: AuthState = {
  user: null,
  signUpError: null,
  loginError: null,
};

export const authReducer = createReducer(
  initialState,
  on(signUpSuccess, (state) => ({ ...state, signUpError: null })),
  on(signUpFailed, (state, { signUpError }) => ({
    ...state,
    signUpError: signUpError,
  })),
  on(login, (state, { userData }) => ({
    ...state,
    user: userData,
    loginError: null,
  })),
  on(loginFailed, (state, { loginError }) => ({
    ...state,
    loginError: loginError,
  }))
);
