import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SendMessageToggleService {
  private isSendMessageOpened = new BehaviorSubject(false);
  currentIsOpened = this.isSendMessageOpened.asObservable();

  openSendMessage() {
    this.isSendMessageOpened.next(true);
  }
  closeSendMessage() {
    this.isSendMessageOpened.next(false);
  }
}
