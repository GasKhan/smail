import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import {
  login,
  loginFailed,
  START_SIGNUP,
  signUpFailed,
  signUpSuccess,
  START_LOGIN,
  logout,
} from './auth.actions';
import {
  catchError,
  EMPTY,
  exhaustMap,
  filter,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserApiService } from '../userApi.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { fetchFolders } from '../../messages/store/messages.actions';

@Injectable()
export class UserEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const accessToken = localStorage.getItem('accessToken');
        return accessToken;
      }),
      filter((accessToken) => !!accessToken),
      map((token) => jwtDecode<{ id: number; email: string }>(token as string)),
      // tap((r) => console.log(r.id, r.email)),
      map((decodedToken) => {
        return login({
          userData: {
            id: decodedToken.id,
            email: decodedToken.email,
          },
        });
      })
    )
  );

  signUp$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(START_SIGNUP),
        exhaustMap((userData) => {
          return this.userApiService.signup(userData).pipe(
            tap((userData) => {
              localStorage.setItem(
                'refreshToken',
                userData.tokens.refreshToken
              );
              localStorage.setItem('accessToken', userData.tokens.accessToken);
            }),
            tap(() => {
              this.router.navigate(['/messages']);
            }),
            map((response) => signUpSuccess({ userData: response.userData })),
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
          tap((r) => {
            // console.log(r.tokens);
            this.router.navigate(['/messages']);
          }),
          tap((userData) => {
            localStorage.setItem('refreshToken', userData.tokens.refreshToken);
            localStorage.setItem('accessToken', userData.tokens.accessToken);
          }),
          map((userResp) => login({ userData: userResp.user })),
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

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        switchMap(() => {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) return this.userApiService.logout(refreshToken);
          return EMPTY;
        }),
        tap(() => {
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userApiService: UserApiService,
    private store: Store,
    private router: Router
  ) {}
}
