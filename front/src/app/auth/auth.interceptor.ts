import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { UserApiService } from './userApi.service';

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const userApiService = inject(UserApiService);

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    const reqWithAccessToken = req.clone({
      headers: req.headers.set('authorization', `Bearer ${accessToken}`),
    });
    return next(reqWithAccessToken).pipe(
      catchError((error) => {
        if (error.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) {
            router.navigate(['/login']);
            return throwError(error);
          }

          return userApiService.refreshAccessToken(refreshToken).pipe(
            tap(({ accessToken }) => {
              localStorage.setItem('accessToken', accessToken);
            }),
            switchMap(({ accessToken }) => {
              const newReqWithAccessToken = req.clone({
                headers: reqWithAccessToken.headers.set(
                  'authorization',
                  `Bearer ${accessToken}`
                ),
              });
              return next(newReqWithAccessToken);
            })
          );
        }
        return throwError(error);
      })
    );
  }
  return next(req);
};
