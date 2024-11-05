import { createAction, props } from '@ngrx/store';
import { Folder } from '../../models/folder.model';
import { Message, MessageToSend } from '../../models/message.model';

export const FETCH_FOLDERS = '[Messages] Fetch Folders';
export const SET_FOLDERS = '[Messages] Set Folders';
export const SELECT_FOLDER = '[Messages] Select Folder';
export const MOVE_TO_FOLDER = '[Messages] Move To Folder';
export const FETCH_MESSAGES = '[Messages] Fetch Messages';
export const REFRESH_MESSAGES = '[Messages] Refresh Messages';
export const SET_MESSAGES = '[Messages] Set Messages';
export const ADD_MESSAGES = '[Messages] Add Messages';
export const START_SEND_MESSAGE = '[Messages] Start Send Message';
export const SEND_MESSAGE_SUCCESS = '[Messages] Send Message Success';
export const SEND_MESSAGE_ERROR = '[Messages] Send Message Error';
export const CHANGE_IS_MESSAGE_WATCHED = '[Messages] Change Is Message Watched';
export const CHANGE_IS_MESSAGE_MARKED = '[Messages] Change Is Message Marked';
export const CHANGE_IS_MESSAGE_CHECKED = '[Messages] Change Is Message Checked';
export const CHECK_MESSAGES_BY_EMAIL_FIELD =
  '[Messages] Check Messages By Email Field';
export const CHECK_ALL_MESSAGES = '[Messages] Check All Messages';
export const UNCHECK_ALL_MESSAGES = '[Messages] Uncheck All Messages';
export const START_DELETE_MESSAGES = '[Messages] Start Delete Messages';
export const DELETE_MESSAGES_SUCCESS = '[Messages] Delete Messages Success';
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
  props<{ emailFromFolderIds: number[]; folderId: number }>()
);

export const fetchMessages = createAction(
  FETCH_MESSAGES,
  props<{ offset: number; limit?: number; folderId: number }>()
);

export const refreshMessages = createAction(
  REFRESH_MESSAGES,
  props<{ offset: number; limit?: number }>()
);

export const setMessages = createAction(
  SET_MESSAGES,
  props<{ messages: Message[] }>()
);

export const addMessages = createAction(
  ADD_MESSAGES,
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

export const startDeleteMessages = createAction(
  START_DELETE_MESSAGES,
  props<{ messageIds: number[] }>()
);

export const deleteMessagesSuccess = createAction(
  DELETE_MESSAGES_SUCCESS,
  props<{ messageIds: number[] }>()
);

export const changeIsMessageWatched = createAction(
  CHANGE_IS_MESSAGE_WATCHED,
  props<{
    messageIds: number[];
    changeIsWatchedTo: boolean;
  }>()
);

export const changeIsMessageMarked = createAction(
  CHANGE_IS_MESSAGE_MARKED,
  props<{
    messageIds: number[];
    isMarkedTo: boolean;
  }>()
);

export const changeIsMessageChecked = createAction(
  CHANGE_IS_MESSAGE_CHECKED,
  props<{
    messageId: number;
    isCheckedTo: boolean;
  }>()
);

export const checkMessagesByField = createAction(
  CHECK_MESSAGES_BY_EMAIL_FIELD,
  props<{ messageField: keyof Message; flagIs: boolean }>()
);

export const checkAllMessages = createAction(CHECK_ALL_MESSAGES);
export const uncheckAllMessages = createAction(UNCHECK_ALL_MESSAGES);

export const changeSearchSubstr = createAction(
  CHANGE_SEARCH_SUBSTR,
  props<{ newSearchSubstr: string }>()
);
