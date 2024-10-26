import { createReducer, on } from '@ngrx/store';
import { Folder } from '../../models/folder.model';
import { Message } from '../../models/message.model';
import {
  changeIsMessageMarked,
  changeIsMessageWatched,
  changeSearchSubstr,
  moveToFolder,
  selectFolder,
  sendMessage,
  sendMessageSuccess,
  setFolders,
  setMessages,
} from './messages.actions';
import { Folders } from '../../models/folder-names';

export type MessagesState = {
  folders: Folder[];
  selectedFolderId: number | null;
  messages: Message[];
  currentFolderPage: number;
  searchSubstr: string;
};

const initialState: MessagesState = {
  folders: [],
  messages: [],
  selectedFolderId: null,
  currentFolderPage: 1,
  searchSubstr: '',
};

export const messagesReducer = createReducer(
  initialState,
  on(setFolders, (state, { folders }) => ({ ...state, folders: folders })),
  on(selectFolder, (state, { selectedFolderId }) => ({
    ...state,
    selectedFolderId,
  })),
  on(moveToFolder, (state, { folderId, emailFromFolderId }) => {
    const editedMessages = state.messages.filter(
      (mes) => mes.emailFromFolderId !== emailFromFolderId
    );
    const editedFolders = state.folders.map((fol) => {
      let totalMessages = fol.totalMessages;
      if (fol.folderId === state.selectedFolderId)
        totalMessages = fol.totalMessages - 1;
      if (fol.folderId === folderId) totalMessages = fol.totalMessages + 1;
      return { ...fol, totalMessages: totalMessages };
    });
    return { ...state, folders: editedFolders, messages: editedMessages };
  }),
  on(setMessages, (state, { messages }) => ({ ...state, messages })),
  on(sendMessageSuccess, (state) => {
    const editedFolders = state.folders.map((folder) =>
      folder.folderName === Folders.Sent
        ? { ...folder, totalMessages: folder.totalMessages + 1 }
        : folder
    );
    return { ...state, folders: editedFolders };
  }),
  // on(sendMessageError) //TODO: ADD SEND MESSAGE ERROR
  on(changeIsMessageWatched, (state, { messageId, changeIsWatchedTo }) => {
    const editedMessages = state.messages.map((message) => {
      if (message.emailId === messageId)
        return { ...message, isWatched: changeIsWatchedTo };
      return message;
    });
    return { ...state, messages: editedMessages };
  }),
  on(changeIsMessageMarked, (state, { messageId, isMarkedTo }) => {
    const editedMessages = state.messages.map((message) => {
      if (message.emailId === messageId)
        return { ...message, isMarked: isMarkedTo };
      return message;
    });
    return { ...state, messages: editedMessages };
  }),
  on(changeSearchSubstr, (state, { newSearchSubstr }) => ({
    ...state,
    searchSubstr: newSearchSubstr,
  }))
);
