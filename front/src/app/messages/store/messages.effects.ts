import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessagesApiService } from '../messagesApi.service';
import {
  FETCH_FOLDERS,
  FETCH_MESSAGES,
  setFolders,
  setMessages,
} from './messages.actions';
import { catchError, EMPTY, exhaustMap, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessagesEffects {
  fetchFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FETCH_FOLDERS),
      exhaustMap(({ userId }) => {
        return this.messagesApiService.fetchFolders(userId).pipe(
          map((folders) => setFolders({ folders })),
          // tap((t) => console.log(t)),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        );
      })
    )
  );

  fetchMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FETCH_MESSAGES),
      exhaustMap((folderId) => {
        return this.messagesApiService.fetchMessagesFromFolder(folderId).pipe(
          // tap((t) => console.log(t)),
          map((messages) => setMessages({ messages })),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private messagesApiService: MessagesApiService
  ) {}
}
