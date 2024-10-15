import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelopeOpen,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-messages-list-item',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './messages-list-item.component.html',
  styleUrl: './messages-list-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListItemComponent {
  faStar = faStar;
  faTrash = faTrashCan;
  faEnvelopeOpen = faEnvelopeOpen;
}
