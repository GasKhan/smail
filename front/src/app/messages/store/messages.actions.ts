import { createAction, props } from '@ngrx/store';
import { Folder } from '../../models/folder.model';
import { Message, MessageToSend } from '../../models/message.model';

export const FETCH_FOLDERS = '[Messages] Fetch Folders';
export const SET_FOLDERS = '[Messages] Set Folders';
export const SELECT_FOLDER = '[Messages] Select Folder';
export const MOVE_TO_FOLDER = '[Messages] Move To Folder';
export const FETCH_MESSAGES = '[Messages] Fetch Messages';
export const SET_MESSAGES = '[Messages] Set Messages';
export const START_SEND_MESSAGE = '[Messages] Start Send Message';
export const SEND_MESSAGE_SUCCESS = '[Messages] Send Message Success';
export const SEND_MESSAGE_ERROR = '[Messages] Send Message Error';
export const CHANGE_IS_MESSAGE_WATCHED = '[Messages] Change Is Message Watched';
export const CHANGE_IS_MESSAGE_MARKED = '[Messages] Change Is Message Marked';
export const CHANGE_SEARCH_SUBSTR = '[Messages] Change Search Substr';

export const fetchFolders = createAction(
  FETCH_FOLDERS,
  props<{ userId: number }>()
);

export const setFolders = createAction(
  SET_FOLDERS,
  props<{ folders: Folder[] }>()
);

export const selectFolder = createAction(
  SELECT_FOLDER,
  props<{ selectedFolderId: number }>()
);

export const moveToFolder = createAction(
  MOVE_TO_FOLDER,
  props<{ emailFromFolderId: number; folderId: number }>()
);

export const fetchMessages = createAction(FETCH_MESSAGES);

export const setMessages = createAction(
  SET_MESSAGES,
  props<{ messages: Message[] }>()
);

export const sendMessage = createAction(
  START_SEND_MESSAGE,
  props<{
    messageData: MessageToSend;
  }>()
);

export const sendMessageSuccess = createAction(SEND_MESSAGE_SUCCESS);

export const sendMessageError = createAction(
  SEND_MESSAGE_ERROR,
  props<{ message: string }>()
);

export const changeIsMessageWatched = createAction(
  CHANGE_IS_MESSAGE_WATCHED,
  props<{
    messageId: number;
    changeIsWatchedTo: boolean;
  }>()
);

export const changeIsMessageMarked = createAction(
  CHANGE_IS_MESSAGE_MARKED,
  props<{
    messageId: number;
    isMarkedTo: boolean;
  }>()
);

export const changeSearchSubstr = createAction(
  CHANGE_SEARCH_SUBSTR,
  props<{ newSearchSubstr: string }>()
);
