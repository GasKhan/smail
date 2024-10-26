import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessagesListItemComponent } from './messages-list-item/messages-list-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faEnvelopeOpen,
  faFolderOpen,
  faRotateRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { StoreState } from '../../store';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  selectFilteredMessages,
  selectTrashFolderId,
} from '../store/messages.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  changeIsMessageMarked,
  changeIsMessageWatched,
  moveToFolder,
} from '../store/messages.actions';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [MessagesListItemComponent, FontAwesomeModule, AsyncPipe, NgClass],
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent {
  faTrashCan = faTrashCan;
  faEnvelopeOpen = faEnvelopeOpen;
  faFolderOpen = faFolderOpen;
  faAngleDown = faAngleDown;
  faRotateRight = faRotateRight;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  isCheckDropdownShown = false;
  messages = this.store.select(selectFilteredMessages);
  trashFolderId!: number;

  moveToTrashFolder(message: Message) {
    this.store.dispatch(
      moveToFolder({
        emailFromFolderId: message.emailFromFolderId,
        folderId: this.trashFolderId,
      })
    );
  }

  flagEmailAsWatched(emailId: number, isWatchedTo: boolean) {
    this.store.dispatch(
      changeIsMessageWatched({
        messageId: emailId,
        changeIsWatchedTo: isWatchedTo,
      })
    );
  }

  flagEmailAsMarked(emailId: number, isMarkedTo: boolean) {
    this.store.dispatch(
      changeIsMessageMarked({
        messageId: emailId,
        isMarkedTo: isMarkedTo,
      })
    );
  }

  toggleCheckDropdown() {
    this.isCheckDropdownShown = !this.isCheckDropdownShown;
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
