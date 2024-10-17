import { createReducer, on } from '@ngrx/store';
import { Folder } from '../../models/folder.model';
import { Message } from '../../models/message.model';
import { setFolders, setMessages } from './messages.actions';

export type MessagesState = {
  folders: Folder[];
  messages: Message[];
};

const initialState: MessagesState = { folders: [], messages: [] };

export const messagesReducer = createReducer(
  initialState,
  on(setFolders, (state, { folders }) => ({ ...state, folders: folders })),
  on(setMessages, (state, { messages }) => ({ ...state, messages }))
);
