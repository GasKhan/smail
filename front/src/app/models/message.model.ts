export type Message = {
  emailId: number;
  title: string;
  textBody: string;
  senderId: number;
  is_watched: boolean;
  isMarked: boolean;
  sentAt: Date;
};
