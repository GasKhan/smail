import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faCheck,
  faEnvelopeCircleCheck,
  faEnvelopeOpen,
  faEnvelopesBulk,
  faExclamation,
  faRotateRight,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { StoreState } from '../../store';
import { Store } from '@ngrx/store';
import {
  selectCheckedMessages,
  selectReceivedFolderId,
  selectSelectedFolderName,
  selectSpamFolderId,
  selectTrashFolderId,
} from '../store/messages.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  changeIsMessageMarked,
  changeIsMessageWatched,
  checkAllMessages,
  checkMessagesByField,
  refreshMessages,
  moveToFolder,
  startDeleteMessages,
  uncheckAllMessages,
} from '../store/messages.actions';
import { NgClass } from '@angular/common';
import { Message } from '../../models/message.model';
import { Folders } from '../../models/folder-names';

@Component({
  selector: 'app-message-control',
  standalone: true,
  imports: [FontAwesomeModule, NgClass],
  templateUrl: './message-control.component.html',
  styleUrl: './message-control.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageControlComponent {
  faTrashCan = faTrashCan;
  faEnvelopeOpen = faEnvelopeOpen;
  faEnvelopeCircleCheck = faEnvelopeCircleCheck;
  faExclamation = faExclamation;
  faStar = faStar;
  faAngleDown = faAngleDown;
  faRotateRight = faRotateRight;
  faCheck = faCheck;
  faEnvelopesBulk = faEnvelopesBulk;

  isCheckDropdownShown = false;
  checkedMessageIds: number[] = [];
  checkedMessageFromFolderIds: number[] = [];
  isEveryCheckedWatched: boolean = false;
  isEveryCheckedMarked: boolean = false;
  trashFolderId!: number;
  spamFolderId!: number;
  receivedFolderId!: number;
  selectedFolderName!: Folders;
  Folders = Folders;

  refreshEmails() {
    this.store.dispatch(refreshMessages({ offset: 0 }));
  }

  toggleCheckDropdown() {
    this.isCheckDropdownShown = !this.isCheckDropdownShown;
  }

  checkAllEmails() {
    this.store.dispatch(checkAllMessages());
  }
  uncheckAllEmails() {
    this.store.dispatch(uncheckAllMessages());
  }

  checkOrUncheckAll() {
    if (this.checkedMessageIds.length) this.uncheckAllEmails();
    else this.checkAllEmails();
  }

  changeCheckedMessagesIsWatched() {
    this.store.dispatch(
      changeIsMessageWatched({
        messageIds: [...this.checkedMessageIds],
        changeIsWatchedTo: !this.isEveryCheckedWatched,
      })
    );
  }

  changeCheckedMessagesIsMarked() {
    this.store.dispatch(
      changeIsMessageMarked({
        messageIds: [...this.checkedMessageIds],
        isMarkedTo: !this.isEveryCheckedMarked,
      })
    );
  }

  moveCheckedToTrash() {
    this.store.dispatch(
      moveToFolder({
        emailFromFolderIds: [...this.checkedMessageFromFolderIds],
        folderId: this.trashFolderId,
      })
    );
  }
  moveCheckedToSpam() {
    this.store.dispatch(
      moveToFolder({
        emailFromFolderIds: [...this.checkedMessageFromFolderIds],
        folderId: this.spamFolderId,
      })
    );
  }

  moveCheckedToReceived() {
    this.store.dispatch(
      moveToFolder({
        emailFromFolderIds: [...this.checkedMessageFromFolderIds],
        folderId: this.receivedFolderId,
      })
    );
  }

  deleteCheckedMessages() {
    this.store.dispatch(
      startDeleteMessages({ messageIds: [...this.checkedMessageIds] })
    );
  }

  checkByEmailField(field: keyof Message, flag: boolean) {
    this.store.dispatch(
      checkMessagesByField({ messageField: field, flagIs: flag })
    );
  }

  constructor(
    private store: Store<StoreState>,
    private ref: ChangeDetectorRef
  ) {
    this.store
      .select(selectCheckedMessages)
      .pipe(takeUntilDestroyed())
      .subscribe((checkedMessages) => {
        this.checkedMessageFromFolderIds = checkedMessages.map(
          (m) => m.emailFromFolderId
        );
        this.checkedMessageIds = checkedMessages.map((m) => m.emailId);
        this.isEveryCheckedWatched = checkedMessages.every((m) => m.isWatched);
        this.isEveryCheckedMarked = checkedMessages.every((m) => m.isMarked);

        this.ref.markForCheck();
      });

    this.store
      .select(selectTrashFolderId)
      .pipe(takeUntilDestroyed())
      .subscribe((id) => {
        this.trashFolderId = id as number;
      });

    this.store
      .select(selectSpamFolderId)
      .pipe(takeUntilDestroyed())
      .subscribe((id) => {
        this.spamFolderId = id as number;
      });

    this.store
      .select(selectReceivedFolderId)
      .pipe(takeUntilDestroyed())
      .subscribe((id) => {
        this.receivedFolderId = id as number;
      });

    this.store
      .select(selectSelectedFolderName)
      .pipe(takeUntilDestroyed())
      .subscribe((selectedFolderName) => {
        if (selectedFolderName) {
          this.selectedFolderName = selectedFolderName;
        }
      });
  }
}
