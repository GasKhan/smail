import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessagesListItemComponent } from './messages-list-item/messages-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Store } from '@ngrx/store';
import { StoreState } from '../../store';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  selectFilteredMessages,
  selectMessages,
  selectSelectedFolderName,
  selectTrashFolderId,
} from '../store/messages.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  changeIsMessageChecked,
  changeIsMessageMarked,
  changeIsMessageWatched,
  fetchMessages,
  moveToFolder,
} from '../store/messages.actions';
import { Message } from '../../models/message.model';
import { MessageControlComponent } from '../message-control/message-control.component';
import { ScrollAtEndDirective } from './scroll-at-end.directive';
import { Folders } from '../../models/folder-names';
import { tap } from 'rxjs';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [
    MessagesListItemComponent,
    FontAwesomeModule,
    AsyncPipe,
    NgClass,
    MessageControlComponent,
    ScrollAtEndDirective,
  ],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  trashFolderId!: number;
  selectedFolderName!: Folders;
  loadedMessagesOffset!: number;
  limit = 10;

  messages$ = this.store.select(selectFilteredMessages);

  moveToTrashFolder(message: Message) {
    this.store.dispatch(
      moveToFolder({
        emailFromFolderIds: [message.emailFromFolderId],
        folderId: this.trashFolderId,
      })
    );
  }

  flagEmailAsWatched(emailId: number, isWatchedTo: boolean) {
    if (this.selectedFolderName === Folders.Sent) return;
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

  onScrollAtEnd() {
    this.store.dispatch(
      fetchMessages({ offset: this.loadedMessagesOffset, limit: this.limit })
    );
    // this.loadedMessagesOffset += this.limit;
  }

  constructor(private store: Store<StoreState>) {
    this.store
      .select(selectTrashFolderId)
      .pipe(takeUntilDestroyed())
      .subscribe((id) => {
        this.trashFolderId = id as number;
      });

    this.store
      .select(selectMessages)
      .pipe(takeUntilDestroyed())
      .subscribe((messages) => {
        this.loadedMessagesOffset = messages.length;
      });

    this.store
      .select(selectSelectedFolderName)
      .pipe(takeUntilDestroyed())
      .subscribe((selectedFolderName) => {
        if (selectedFolderName) this.selectedFolderName = selectedFolderName;
      });
  }
}
