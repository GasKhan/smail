import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { ShowMessageComponent } from './show-message/show-message.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

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
  constructor(private http: HttpClient) {
    // this.http
    //   .get('http://localhost:3000/folders', {
    //     params: {
    //       user_id: 28,
    //     },
    //   })
    //   .subscribe((r) => console.log(r));
  }
}
