import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '../models/folder.model';
import { Message } from '../models/message.model';
import { map } from 'rxjs/internal/operators/map';
import { getBooleanFromTinyInt } from '../../helpers/getBooleanFromTinyInt';

type MessageFromDB = {
  emailId: number;
  title: string;
  textBody: string;
  senderId: number;
  isWatched: number;
  isMarked: number;
  sentAt: Date;
  folderId: number;
};

@Injectable({ providedIn: 'root' })
export class MessagesApiService {
  fetchFolders(userId: number) {
    return this.http.get<Folder[]>('http://localhost:3000/folders', {
      params: { user_id: userId },
    });
  }

  fetchMessagesFromFolder(data: { folderId: number }) {
    return this.http
      .get<MessageFromDB[]>('http://localhost:3000/messages', {
        params: { folder_id: data.folderId },
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

  sendMessage() {
    this.http
      .post('http://localhost:3000/messages', {
        messageObj: {
          sender_id: 36,
          title: 'from front',
          text_body: 'new test',
          sent_at: '9999-12-31',
        },
        recipientUserEmail: 'Abu',
      })
      .subscribe((r) => console.log(r));
  }

  constructor(private http: HttpClient) {}
}
