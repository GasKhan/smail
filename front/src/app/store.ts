import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { authReducer, AuthState } from './auth/store/auth.reducer';
import {
  messagesReducer,
  MessagesState,
} from './messages/store/messages.reducer';

export interface StoreState {
  auth: AuthState;
  messages: MessagesState;
}

export const appStore: ActionReducerMap<StoreState> = {
  auth: authReducer,
  messages: messagesReducer,
};

export const selectMessagesState =
  createFeatureSelector<MessagesState>('messages');
