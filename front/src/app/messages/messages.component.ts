import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { HeaderComponent } from '../header/header.component';
import { SendMessageToggleService } from '../sendMessage-toggle.service';
import { AsyncPipe } from '@angular/common';
import { SendMessageComponent } from './send-message/send-message.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    AsideNavComponent,
    HeaderComponent,
    SendMessageComponent,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent {
  constructor(public toggleSendMessageService: SendMessageToggleService) {}
}
