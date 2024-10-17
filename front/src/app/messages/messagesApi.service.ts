import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '../models/folder.model';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class MessagesApiService {
  fetchFolders(userId: number) {
    return this.http.get<Folder[]>('http://localhost:3000/folders', {
      params: { user_id: userId },
    });
  }

  fetchMessagesFromFolder(data: { folderId: number }) {
    return this.http.get<Message[]>('http://localhost:3000/messages', {
      params: { folder_id: data.folderId },
    });
  }

  constructor(private http: HttpClient) {}
}
