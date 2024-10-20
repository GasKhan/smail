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
import { Store } from '@ngrx/store';
import { StoreState } from '../store';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Folder } from '../models/folder.model';
import { SendMessageToggleService } from '../sendMessage-toggle.service';

@Component({
  selector: 'app-aside-nav',
  standalone: true,
  imports: [RouterModule, FontAwesomeModule, AsyncPipe],
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

  // folders = [
  //   { name: 'Recieved', itemsCount: 24 },
  //   { name: 'Sent', itemsCount: 4 },
  //   { name: 'Span', itemsCount: 57 },
  //   { name: 'Trash', itemsCount: 11 },
  // ];

  folders = this.store.select((state) => state.messages.folders);

  openSendMessage() {
    this.toggleSendMessageService.openSendMessage();
  }

  constructor(
    private store: Store<StoreState>,
    private toggleSendMessageService: SendMessageToggleService
  ) {}
}
