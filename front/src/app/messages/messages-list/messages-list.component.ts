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
import { MessagesApiService } from '../messagesApi.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  imports: [MessagesListItemComponent, FontAwesomeModule],
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
}
