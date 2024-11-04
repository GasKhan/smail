import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEnvelope,
  faExclamation,
  faPaperPlane,
  faPencil,
  faTrash,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { StoreState } from '../../store';
import { AsyncPipe } from '@angular/common';
import { SendMessageToggleService } from '../../sendMessage-toggle.service';
import { selectFolder } from '../../messages/store/messages.actions';
import { Folders } from '../../models/folder-names';

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

  folderIcons: Record<Folders, IconDefinition> = {
    Recieved: faEnvelope,
    Sent: faPaperPlane,
    TrashFolder: faTrash,
    Spam: faExclamation,
    Drafts: faEnvelope,
  };

  folders = this.store.select((state) => state.messages.folders);

  openSendMessage() {
    this.toggleSendMessageService.openSendMessage();
  }

  goToFolder(folderId: number) {
    this.store.dispatch(selectFolder({ selectedFolderId: folderId }));
  }

  constructor(
    private store: Store<StoreState>,
    private toggleSendMessageService: SendMessageToggleService
  ) {}
}
