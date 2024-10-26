import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginFailed,
  START_SIGNUP,
  signUpFailed,
  signUpSuccess,
  START_LOGIN,
  LOGIN_SUCCESS,
} from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { UserApiService } from '../userApi.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { fetchFolders } from '../../messages/store/messages.actions';

@Injectable()
export class UserEffects {
  signUp$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(START_SIGNUP),
        exhaustMap((userData) => {
          return this.userApiService.signup(userData).pipe(
            tap(() => {
              this.router.navigate(['/login']);
            }),
            map(() => signUpSuccess()),
            catchError((e) => {
              console.error(e);
              return of(signUpFailed(e));
            })
          );
        })
      ),
    { dispatch: false }
  );

  startLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(START_LOGIN),
      exhaustMap((userData) => {
        return this.userApiService.login(userData).pipe(
          tap(() => {
            this.router.navigate(['']);
          }),
          map((userResp) => login({ userData: userResp })),

          catchError((err) => {
            console.error(err);
            return of(loginFailed({ loginError: err }));
          })
        );
      })
    )
  );

  fetchFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      // tap(() => console.log('Fetching folders!!!')),
      map(({ userData }) => fetchFolders({ userId: userData.id }))
    )
  );

  constructor(
    private actions$: Actions,
    private userApiService: UserApiService,
    private store: Store,
    private router: Router
  ) {}
}
