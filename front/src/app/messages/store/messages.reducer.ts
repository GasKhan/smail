import { createReducer, on } from '@ngrx/store';
import { Folder } from '../../models/folder.model';
import { Message } from '../../models/message.model';
import {
  addMessages,
  changeIsMessageChecked,
  changeIsMessageMarked,
  changeIsMessageWatched,
  changeSearchSubstr,
  checkAllMessages,
  checkMessagesByField,
  deleteMessagesSuccess,
  moveToFolder,
  selectFolder,
  sendMessageSuccess,
  setFolders,
  setMessages,
  uncheckAllMessages,
} from './messages.actions';
import { Folders } from '../../models/folder-names';
import { logout } from '../../auth/store/auth.actions';

export type MessagesState = {
  folders: Folder[];
  selectedFolderId: number | null;
  messages: Message[];
  searchSubstr: string;
};

const initialState: MessagesState = {
  folders: [],
  messages: [],
  selectedFolderId: null,
  searchSubstr: '',
};

export const messagesReducer = createReducer(
  initialState,
  on(setFolders, (state, { folders }) => ({ ...state, folders: folders })),
  on(selectFolder, (state, { selectedFolderId }) => ({
    ...state,
    selectedFolderId,
  })),
  on(moveToFolder, (state, { folderId, emailFromFolderIds }) => {
    const editedMessages = state.messages.filter(
      (mes) => !emailFromFolderIds.includes(mes.emailFromFolderId)
    );
    const editedFolders = state.folders.map((fol) => {
      let totalMessages = fol.totalMessages;
      if (fol.folderId === state.selectedFolderId)
        totalMessages = fol.totalMessages - emailFromFolderIds.length;
      if (fol.folderId === folderId)
        totalMessages = fol.totalMessages + emailFromFolderIds.length;
      return { ...fol, totalMessages: totalMessages };
    });
    return { ...state, folders: editedFolders, messages: editedMessages };
  }),
  on(setMessages, (state, { messages }) => ({ ...state, messages })),
  on(addMessages, (state, { messages }) => ({
    ...state,
    messages: [...state.messages, ...messages],
  })),
  on(sendMessageSuccess, (state) => {
    const editedFolders = state.folders.map((folder) =>
      folder.folderName === Folders.Sent
        ? { ...folder, totalMessages: folder.totalMessages + 1 }
        : folder
    );
    return { ...state, folders: editedFolders };
  }),
  on(deleteMessagesSuccess, (state, { messageIds }) => {
    const editedMessages = state.messages.filter(
      (m) => !messageIds.includes(m.emailId)
    );
    const editedFolders = state.folders.map((f) => {
      if (f.folderName === Folders.TrashFolder)
        return { ...f, totalMessages: f.totalMessages - messageIds.length };
      return f;
    });
    return { ...state, messages: editedMessages, folders: editedFolders };
  }),
  // on(sendMessageError) //TODO: ADD SEND MESSAGE ERROR
  on(changeIsMessageWatched, (state, { messageIds, changeIsWatchedTo }) => {
    const editedMessages = state.messages.map((message) => {
      if (messageIds.includes(message.emailId))
        return { ...message, isWatched: changeIsWatchedTo };
      return message;
    });
    return { ...state, messages: editedMessages };
  }),
  on(changeIsMessageMarked, (state, { messageIds, isMarkedTo }) => {
    const editedMessages = state.messages.map((message) => {
      if (messageIds.includes(message.emailId))
        return { ...message, isMarked: isMarkedTo };
      return message;
    });
    return { ...state, messages: editedMessages };
  }),
  on(changeIsMessageChecked, (state, { messageId, isCheckedTo }) => {
    const editedMessages = state.messages.map((message) => {
      if (message.emailId === messageId)
        return { ...message, isChecked: isCheckedTo };
      return message;
    });
    return { ...state, messages: editedMessages };
  }),
  on(checkMessagesByField, (state, { messageField, flagIs }) => {
    const editedMessages = state.messages.map((m) => {
      if (m[messageField] === flagIs) return { ...m, isChecked: true };
      return { ...m, isChecked: false };
    });
    return { ...state, messages: editedMessages };
  }),
  on(checkAllMessages, (state) => {
    const editedMessages = state.messages.map((m) => ({
      ...m,
      isChecked: true,
    }));
    return { ...state, messages: editedMessages };
  }),
  on(uncheckAllMessages, (state) => {
    const editedMessages = state.messages.map((m) => ({
      ...m,
      isChecked: false,
    }));
    return { ...state, messages: editedMessages };
  }),
  on(changeSearchSubstr, (state, { newSearchSubstr }) => ({
    ...state,
    searchSubstr: newSearchSubstr,
  })),
  on(logout, (state) => {
    return {
      ...state,
      folders: [],
      messages: [],
      selectedFolderId: null,
      currentFolderPage: 1,
      searchSubstr: '',
    };
  })
);
