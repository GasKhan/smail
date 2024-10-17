import { createAction, props } from '@ngrx/store';
import { UserLogin, UserResp } from '../../models/user.model';

export const SIGNUP = '[Auth] Signup';
export const SIGNUP_FAILED = '[Auth] Signup Failed';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';
export const START_LOGIN = '[Auth] Start Login';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAILED = '[Auth] Login Failed';

export const signUp = createAction(
  SIGNUP,
  props<{ userData: UserLogin & { username: string } }>()
);

export const signUpFailed = createAction(
  SIGNUP_FAILED,
  props<{ signUpError: string }>()
);

export const signUpSuccess = createAction(SIGNUP_SUCCESS);

export const startLogin = createAction(
  START_LOGIN,
  props<{ userData: UserLogin }>()
);

export const login = createAction(LOGIN, props<{ userData: UserResp }>());

export const loginFailed = createAction(
  LOGIN_FAILED,
  props<{ loginError: string }>()
);
