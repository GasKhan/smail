import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessagesApiService } from '../messagesApi.service';
import {
  changeIsMessageMarked,
  changeIsMessageWatched,
  deleteMessagesSuccess,
  FETCH_FOLDERS,
  fetchMessages,
  moveToFolder,
  selectFolder,
  sendMessage,
  sendMessageError,
  sendMessageSuccess,
  setFolders,
  setMessages,
  startDeleteMessages,
} from './messages.actions';
import {
  catchError,
  combineLatest,
  EMPTY,
  exhaustMap,
  map,
  mergeMap,
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
            map((messages) => {
              const messagesWithIsCheckedAdded = messages.map((m) => ({
                ...m,
                isChecked: false,
              }));
              return setMessages({ messages: messagesWithIsCheckedAdded });
            }),
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
  //TODO: pass ids to deleteMessagesSuccess
  startDeleteMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startDeleteMessages),
      mergeMap(({ messageIds }) => {
        return combineLatest([
          of(messageIds),
          this.messagesApiService.deleteMessage(messageIds),
        ]).pipe(
          map(([messageIds, res]) => deleteMessagesSuccess({ messageIds })),
          catchError((err) => {
            console.error(err);
            return EMPTY;
          })
        );
      })
    )
  );

  moveToFolder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(moveToFolder),
        exhaustMap(({ emailFromFolderIds, folderId }) => {
          return this.messagesApiService
            .moveMessageToFolder(folderId, emailFromFolderIds)
            .pipe(
              // tap(() => console.log('Sending move to folder to back')),
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
        exhaustMap(({ messageIds, changeIsWatchedTo }) => {
          return this.messagesApiService
            .flagAsWatched(messageIds, changeIsWatchedTo)
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
        exhaustMap(({ messageIds, isMarkedTo }) => {
          return this.messagesApiService
            .flagAsMarked(messageIds, isMarkedTo)
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
