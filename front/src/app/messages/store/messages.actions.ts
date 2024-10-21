import { createAction, props } from '@ngrx/store';
import { Folder } from '../../models/folder.model';
import { Message } from '../../models/message.model';

export const FETCH_FOLDERS = '[Messages] Fetch Folders';
export const SET_FOLDERS = '[Messages] Set Folders';
export const FETCH_MESSAGES = '[Messages] Fetch Messages';
export const SET_MESSAGES = '[Messages] Set Messages';
export const CHANGE_SEARCH_SUBSTR = '[Messages] Change Search Substr';

export const fetchFolders = createAction(
  FETCH_FOLDERS,
  props<{ userId: number }>()
);

export const setFolders = createAction(
  SET_FOLDERS,
  props<{ folders: Folder[] }>()
);

export const fetchMessages = createAction(
  FETCH_MESSAGES,
  props<{ folderId: number }>()
);

export const setMessages = createAction(
  SET_MESSAGES,
  props<{ messages: Message[] }>()
);

export const changeSearchSubstr = createAction(
  CHANGE_SEARCH_SUBSTR,
  props<{ newSearchSubstr: string }>()
);
