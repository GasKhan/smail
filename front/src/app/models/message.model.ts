export type Message = {
  emailId: number;
  title: string;
  textBody: string;
  senderId: number;
  isWatched: boolean;
  isMarked: boolean;
  sentAt: Date;
  folderId: number;
};
