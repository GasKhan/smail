export interface Email {
  sender_id: number;
  title: string;
  text_body: string;
  sent_at: Date;
  is_watched: boolean;
  is_marked: boolean;
}
