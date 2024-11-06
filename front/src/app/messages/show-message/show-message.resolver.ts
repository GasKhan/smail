import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { MessagesApiService } from '../messagesApi.service';
import { Observable } from 'rxjs';
import { Message } from '../../models/message.model';

export const showMessageResolver: ResolveFn<Observable<Message>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const messageId = route.params['id'];
  const messagesApiService = inject(MessagesApiService);

  return messagesApiService.fetchMessage(messageId);
};
