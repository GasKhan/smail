import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { ShowMessageComponent } from './messages/show-message/show-message.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { Store } from '@ngrx/store';
import { fetchFolders, fetchMessages } from './messages/store/messages.actions';
import { SendMessageComponent } from './messages/send-message/send-message.component';
import { SendMessageToggleService } from './sendMessage-toggle.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddFileComponent } from './messages/add-file/add-file.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NgClass,
    HeaderComponent,
    AsideNavComponent,
    MessagesListComponent,
    ShowMessageComponent,
    LoginComponent,
    SignupComponent,
    SendMessageComponent,
    AddFileComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isSendMessageOpen!: boolean;

  constructor(
    private store: Store,
    private toggleSendMessageService: SendMessageToggleService
  ) {
    this.store.dispatch(fetchFolders({ userId: 36 }));
    this.store.dispatch(fetchMessages({ folderId: 50 }));

    this.toggleSendMessageService.currentIsOpened
      .pipe(takeUntilDestroyed())
      .subscribe((isOpen) => {
        this.isSendMessageOpen = isOpen;
      });
  }
}
