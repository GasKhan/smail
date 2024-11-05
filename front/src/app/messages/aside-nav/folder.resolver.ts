import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreState } from '../../store';
import { EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { MessagesApiService } from '../messagesApi.service';
import {
  selectFilteredMessages,
  selectFolderFromRoute,
} from '../store/messages.selectors';
import { fetchMessages, selectFolder } from '../store/messages.actions';

export const folderResolver: ResolveFn<Object> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store: Store<StoreState> = inject(Store);
  const messagesApiService = inject(MessagesApiService);
  const folderName = route.routeConfig?.path;

  return store.select(selectFolderFromRoute(folderName!)).pipe(
    tap((folder) => {
      if (folder)
        store.dispatch(selectFolder({ selectedFolderId: folder.folderId }));
    }),
    filter((folder) => !!folder),
    map((folder) => folder?.folderId)
  );
};
