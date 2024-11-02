import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SendMessageToggleService {
  private isSendMessageOpened = new BehaviorSubject({
    isOpened: false,
    sendTo: '',
    title: '',
    body: '',
  });

  currentIsOpened = this.isSendMessageOpened.asObservable();

  openSendMessage(sendTo = '', title = '', body = '') {
    this.isSendMessageOpened.next({
      isOpened: true,
      sendTo: sendTo,
      title: title,
      body: body,
    });
  }
  closeSendMessage() {
    this.isSendMessageOpened.next({
      isOpened: false,
      sendTo: '',
      title: '',
      body: '',
    });
  }
}
