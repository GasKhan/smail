import { createReducer, on } from '@ngrx/store';
import { Folder } from '../../models/folder.model';
import { Message } from '../../models/message.model';
import {
  changeSearchSubstr,
  setFolders,
  setMessages,
} from './messages.actions';

export type MessagesState = {
  folders: Folder[];
  messages: Message[];
  searchSubstr: string;
};

const initialState: MessagesState = {
  folders: [],
  messages: [],
  searchSubstr: '',
};

export const messagesReducer = createReducer(
  initialState,
  on(setFolders, (state, { folders }) => ({ ...state, folders: folders })),
  on(setMessages, (state, { messages }) => ({ ...state, messages })),
  on(changeSearchSubstr, (state, { newSearchSubstr }) => ({
    ...state,
    searchSubstr: newSearchSubstr,
  }))
);
