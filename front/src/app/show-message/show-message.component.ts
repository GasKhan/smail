import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faReply, faReplyAll, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-message',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './show-message.component.html',
  styleUrl: './show-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMessageComponent {
  faStar = faStar;
  faReply = faReply;
  faReplyAll = faReplyAll;
}
