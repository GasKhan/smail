import { Routes } from '@angular/router';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { ShowMessageComponent } from './messages/show-message/show-message.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'recieved', pathMatch: 'full' },
  { path: 'recieved', component: MessagesListComponent },
  { path: 'sent', component: MessagesListComponent },
  { path: 'spam', component: MessagesListComponent },
  { path: 'trashfolder', component: MessagesListComponent },
  { path: 'message/:id', component: ShowMessageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];
