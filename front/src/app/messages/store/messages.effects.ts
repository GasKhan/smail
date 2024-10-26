import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessagesApiService } from '../messagesApi.service';
import {
  changeIsMessageMarked,
  changeIsMessageWatched,
  FETCH_FOLDERS,
  fetchMessages,
  moveToFolder,
  selectFolder,
  sendMessage,
  sendMessageError,
  sendMessageSuccess,
  setFolders,
  setMessages,
} from './messages.actions';
import {
  catchError,
  EMPTY,
  exhaustMap,
  map,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreState } from '../../store';
import {
  getSelectedFolderId,
  selectRecievedFolder,
} from './messages.selectors';

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

  startingSelectFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setFolders),
      switchMap(() => {
        return this.store.select(selectRecievedFolder).pipe(
          take(1),
          map((folder) => folder?.folderId)
        );
      }),
      // tap((t) => console.log(t)),
      map((recievedFolderId) =>
        selectFolder({ selectedFolderId: recievedFolderId as number })
      )
    )
  );

  fetchMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectFolder, fetchMessages),
      switchMap(() => {
        return this.store.select(getSelectedFolderId).pipe(
          take(1),
          map((folderId) => folderId as number)
        );
      }),
      // tap((t) => console.log(t)),
      switchMap((folderId) => {
        return this.messagesApiService
          .fetchMessagesFromFolder({ folderId })
          .pipe(
            map((messages) => setMessages({ messages })),
            catchError((err) => {
              console.error(err);
              return EMPTY;
            })
          );
      })
    )
  );

  startSendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendMessage),
      switchMap(({ messageData }) => {
        return this.messagesApiService.sendMessage(messageData).pipe(
          map((r) => sendMessageSuccess()),
          catchError((err) =>
            of(sendMessageError({ message: err.error.message }))
          )
        );
      })
    )
  );

  moveToFolder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(moveToFolder),
        exhaustMap(({ emailFromFolderId, folderId }) => {
          return this.messagesApiService
            .moveMessageToFolder(folderId, emailFromFolderId)
            .pipe(
              catchError((err) => {
                return of(err.message);
              })
            );
        })
      ),
    { dispatch: false }
  );

  flagAsWatched$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(changeIsMessageWatched),
        exhaustMap(({ messageId, changeIsWatchedTo }) => {
          return this.messagesApiService
            .flagAsWatched(messageId, changeIsWatchedTo)
            .pipe(
              catchError((err) => {
                console.error(err);
                return EMPTY;
              })
            );
        })
      ),
    { dispatch: false }
  );
  flagAsMarked$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(changeIsMessageMarked),
        exhaustMap(({ messageId, isMarkedTo }) => {
          return this.messagesApiService
            .flagAsMarked(messageId, isMarkedTo)
            .pipe(
              catchError((err) => {
                console.error(err);
                return EMPTY;
              })
            );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<StoreState>,
    private messagesApiService: MessagesApiService
  ) {}
}
