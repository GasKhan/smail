import { createSelector } from '@ngrx/store';
import { selectMessagesState } from '../../store';
import { Folders } from '../../models/folder-names';

export const selectMessages = createSelector(
  selectMessagesState,
  (messagesState) => messagesState.messages
);

export const selectSearchSubstr = createSelector(
  selectMessagesState,
  (messagesState) => messagesState.searchSubstr
);

export const getSelectedFolderId = createSelector(
  selectMessagesState,
  (messagesState) => messagesState.selectedFolderId
);

export const selectRecievedFolder = createSelector(
  selectMessagesState,
  (messages) =>
    messages.folders.find((folder) => folder.folderName === Folders.Recieved)
);

export const selectTrashFolderId = createSelector(
  selectMessagesState,
  (messages) =>
    messages.folders.find((folder) => folder.folderName === Folders.TrashFolder)
      ?.folderId
);

export const selectSpamFolderId = createSelector(
  selectMessagesState,
  (messages) =>
    messages.folders.find((folder) => folder.folderName === Folders.Spam)
      ?.folderId
);

export const selectReceivedFolderId = createSelector(
  selectMessagesState,
  (messages) =>
    messages.folders.find((folder) => folder.folderName === Folders.Recieved)
      ?.folderId
);

export const selectFilteredMessages = createSelector(
  selectMessages,
  selectSearchSubstr,
  (messages, substr) => {
    return messages.filter((message) => {
      const regexp = new RegExp(`\\b${substr}`, 'i');

      const isTitleStartsWith = message.title.search(regexp);
      const isBodyStartsWith = message.textBody.search(regexp);

      return isTitleStartsWith >= 0 || isBodyStartsWith >= 0;
    });
  }
);

export const selectSelectedFolderName = createSelector(
  selectMessagesState,
  (messagesState) => {
    const selectedFolderId = messagesState.selectedFolderId;
    const selectedFolder = messagesState.folders.find(
      (folder) => folder.folderId === selectedFolderId
    );
    return selectedFolder?.folderName;
  }
);

export const selectFolderFromRoute = (folderName: string) =>
  createSelector(selectMessagesState, (messagesState) =>
    messagesState.folders.find((folder) => {
      return folder.folderName.toLowerCase() === folderName?.toLowerCase();
    })
  );

export const selectCheckedMessages = createSelector(
  selectMessages,
  (messages) => messages.filter((m) => m.isChecked === true)
);
