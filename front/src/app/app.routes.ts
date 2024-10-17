import { Routes } from '@angular/router';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { ShowMessageComponent } from './messages/show-message/show-message.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: '', component: MessagesListComponent },
  { path: 'message', component: ShowMessageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];
