import { Routes } from '@angular/router';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { ShowMessageComponent } from './messages/show-message/show-message.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { authGuard } from './auth/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { folderResolver } from './messages/aside-nav/folder.resolver';
import { showMessageResolver } from './messages/show-message/show-message.resolver';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'messages',
    loadComponent: () =>
      import('./messages/messages.component').then((m) => m.MessagesComponent),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'recieved',
        component: MessagesListComponent,
        resolve: { folderId: folderResolver },
      },
      {
        path: 'sent',
        component: MessagesListComponent,
        resolve: { folderId: folderResolver },
      },
      {
        path: 'spam',
        component: MessagesListComponent,
        resolve: { folderId: folderResolver },
      },
      {
        path: 'trashfolder',
        component: MessagesListComponent,
        resolve: { folderId: folderResolver },
      },
      {
        path: 'message/:id',
        component: ShowMessageComponent,
        resolve: {
          message: showMessageResolver,
        },
      },
      { path: '', redirectTo: 'messages/recieved', pathMatch: 'full' },
    ],
  },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];
