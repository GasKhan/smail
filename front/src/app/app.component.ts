import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { ShowMessageComponent } from './messages/show-message/show-message.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { Store } from '@ngrx/store';
import { fetchFolders, fetchMessages } from './messages/store/messages.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    AsideNavComponent,
    MessagesListComponent,
    ShowMessageComponent,
    LoginComponent,
    SignupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private store: Store) {
    // this.store.dispatch(fetchFolders({ userId: 36 }));
    // this.store.dispatch(fetchMessages({ folderId: 50 }));
  }
}
