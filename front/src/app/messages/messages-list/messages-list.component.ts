import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessagesListItemComponent } from './messages-list-item/messages-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faEnvelopeCircleCheck,
  faEnvelopeOpen,
  faExclamation,
  faFolderOpen,
  faRotateRight,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { StoreState } from '../../store';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  selectCheckedMessages,
  selectFilteredMessages,
  selectSpamFolderId,
  selectTrashFolderId,
} from '../store/messages.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  changeIsMessageChecked,
  changeIsMessageMarked,
  changeIsMessageWatched,
  checkAllMessages,
  checkMessagesByField,
  fetchMessages,
  moveToFolder,
  uncheckAllMessages,
} from '../store/messages.actions';
import { Message } from '../../models/message.model';
import { MessageControlComponent } from '../message-control/message-control.component';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [
    MessagesListItemComponent,
    FontAwesomeModule,
    AsyncPipe,
    NgClass,
    MessageControlComponent,
  ],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  trashFolderId!: number;

  messages = this.store.select(selectFilteredMessages);

  moveToTrashFolder(message: Message) {
    this.store.dispatch(
      moveToFolder({
        emailFromFolderIds: [message.emailFromFolderId],
        folderId: this.trashFolderId,
      })
    );
  }

  flagEmailAsWatched(emailId: number, isWatchedTo: boolean) {
    this.store.dispatch(
      changeIsMessageWatched({
        messageIds: [emailId],
        changeIsWatchedTo: isWatchedTo,
      })
    );
  }

  flagEmailAsMarked(emailId: number, isMarkedTo: boolean) {
    this.store.dispatch(
      changeIsMessageMarked({
        messageIds: [emailId],
        isMarkedTo: isMarkedTo,
      })
    );
  }

  flagEmailAsChecked(emailId: number, isCheckedTo: boolean) {
    this.store.dispatch(
      changeIsMessageChecked({
        messageId: emailId,
        isCheckedTo: isCheckedTo,
      })
    );
  }

  constructor(private store: Store<StoreState>) {
    this.store
      .select(selectTrashFolderId)
      .pipe(takeUntilDestroyed())
      .subscribe((id) => {
        this.trashFolderId = id as number;
      });
  }
}
