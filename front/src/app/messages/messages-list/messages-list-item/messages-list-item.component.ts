import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faEnvelope,
  faEnvelopeOpen,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Message } from '../../../models/message.model';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { StoreState } from '../../../store';
import { selectSelectedFolderName } from '../../store/messages.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Folders } from '../../../models/folder-names';

@Component({
  selector: 'app-messages-list-item',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, NgClass],
  templateUrl: './messages-list-item.component.html',
  styleUrl: './messages-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListItemComponent implements OnInit {
  @Input() message!: Message;
  @Input() isInTrash!: boolean;
  @Output() onMoveToTrash = new EventEmitter();
  @Output() onFlagAsWatched = new EventEmitter<boolean>();
  @Output() onFlagAsMarked = new EventEmitter<boolean>();
  @Output() onFlagAsChecked = new EventEmitter<boolean>();

  time: any;
  messageText!: string;
  selectedFolderName!: Folders;
  Folders = Folders;

  faStar = faStar;
  faTrash = faTrashCan;
  faEnvelopeOpen = faEnvelopeOpen;
  faEnvelope = faEnvelope;
  faCheck = faCheck;

  moveToTrash() {
    this.onMoveToTrash.emit();
  }

  flagAsWatched() {
    this.onFlagAsWatched.emit(!this.message.isWatched);
  }

  flagAsMarked() {
    this.onFlagAsMarked.emit(!this.message.isMarked);
  }

  flagAsChecked() {
    this.onFlagAsChecked.emit(!this.message.isChecked);
  }

  ngOnInit() {
    this.messageText = this.message.textBody.replace(
      /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,
      ''
    );
    this.time = new Date(this.message.sentAt);
  }

  constructor(private store: Store<StoreState>) {
    this.store
      .select(selectSelectedFolderName)
      .pipe(takeUntilDestroyed())
      .subscribe((selectedFolderName) => {
        if (selectedFolderName) this.selectedFolderName = selectedFolderName;
      });
  }
}
