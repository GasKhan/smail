import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelopeOpen,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Message } from '../../../models/message.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-messages-list-item',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './messages-list-item.component.html',
  styleUrl: './messages-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListItemComponent {
  @Input() message!: Message;

  faStar = faStar;
  faTrash = faTrashCan;
  faEnvelopeOpen = faEnvelopeOpen;
}
