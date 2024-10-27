export interface MessageToSend {
  recipientEmail: string;
  title: string;
  textBody: string;
}

export interface Message extends MessageToSend {
  emailId: number;
  senderId: number;
  senderName: string;
  sentAt: Date;
  isWatched: boolean;
  isMarked: boolean;
  folderId: number;
  emailFromFolderId: number;
  isChecked: boolean;
}
