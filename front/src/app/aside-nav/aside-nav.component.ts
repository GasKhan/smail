import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faExclamation,
  faPaperPlane,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aside-nav',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './aside-nav.component.html',
  styleUrl: './aside-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideNavComponent {
  faPencil = faPencil;
  faEnvelope = faEnvelope;
  faPaperPlane = faPaperPlane;
  faExclamation = faExclamation;
  faTrash = faTrash;

  folders = [
    { name: 'Recieved', itemsCount: 24 },
    { name: 'Sent', itemsCount: 4 },
    { name: 'Span', itemsCount: 57 },
    { name: 'Trash', itemsCount: 11 },
  ];
}
