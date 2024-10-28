import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '../models/folder.model';
import { Message, MessageToSend } from '../models/message.model';
import { map } from 'rxjs/internal/operators/map';
import { getBooleanFromTinyInt } from '../../helpers/getBooleanFromTinyInt';
import { Store } from '@ngrx/store';
import { StoreState } from '../store';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type MessageFromDB = {
  emailId: number;
  title: string;
  textBody: string;
  senderId: number;
  senderName: string;
  recipientEmail: string;
  isWatched: number;
  isMarked: number;
  sentAt: Date;
  folderId: number;
  emailFromFolderId: number;
};

@Injectable({ providedIn: 'root' })
export class MessagesApiService {
  userId!: number;

  fetchFolders(userId: number) {
    return this.http.get<Folder[]>('http://localhost:3000/folders', {
      params: { user_id: userId },
    });
  }

  fetchMessagesFromFolder(
    data: { folderId: number },
    offset: number,
    limit = 10
  ) {
    return this.http
      .get<MessageFromDB[]>('http://localhost:3000/messages', {
        params: { folder_id: data.folderId, offset, limit },
      })
      .pipe(
        map((messages) =>
          messages.map((message) => ({
            ...message,
            isWatched: getBooleanFromTinyInt(message.isWatched),
            isMarked: getBooleanFromTinyInt(message.isMarked),
          }))
        )
      );
  }

  sendMessage(messageData: MessageToSend) {
    return this.http.post('http://localhost:3000/messages', {
      messageObj: {
        senderId: this.userId,
        recipientEmail: messageData.recipientEmail,
        title: messageData.title,
        textBody: messageData.textBody,
        sentAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      },
    });
  }

  moveMessageToFolder(folderId: number, emailFromFolderIds: number[]) {
    return this.http.patch('http://localhost:3000/messages/toFolder', {
      folderId,
      emailFromFolderIds,
    });
  }

  flagAsWatched(emailIds: number[], changeIsWatchedTo: boolean) {
    return this.http.patch('http://localhost:3000/messages/flagAsWatched', {
      emailIds,
      changeIsWatchedTo,
    });
  }

  flagAsMarked(emailIds: number[], isMarkedTo: boolean) {
    return this.http.patch('http://localhost:3000/messages/flagAsMarked', {
      emailIds,
      isMarkedTo,
    });
  }

  deleteMessage(emailIds: number[]) {
    return this.http.delete('http://localhost:3000/messages', {
      params: {
        emailIds: emailIds,
      },
    });
  }

  constructor(private http: HttpClient, private store: Store<StoreState>) {
    this.store
      .select((state) => state.auth.user?.id)
      .pipe(takeUntilDestroyed())
      .subscribe((uid) => {
        console.log(uid + ' uid');
        if (uid) this.userId = uid;
      });
  }
}
