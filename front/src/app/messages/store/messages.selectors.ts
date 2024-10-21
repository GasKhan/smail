import { createSelector } from '@ngrx/store';
import { selectMessagesState } from '../../store';

export const selectMessages = createSelector(
  selectMessagesState,
  (messagesState) => messagesState.messages
);

export const selectSearchSubstr = createSelector(
  selectMessagesState,
  (messagesState) => messagesState.searchSubstr
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
