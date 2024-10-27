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
  faEnvelope,
  faEnvelopeOpen,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Message } from '../../../models/message.model';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

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

  faStar = faStar;
  faTrash = faTrashCan;
  faEnvelopeOpen = faEnvelopeOpen;
  faEnvelope = faEnvelope;

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
    this.time = new Date(this.message.sentAt);
  }
}
