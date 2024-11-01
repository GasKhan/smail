import { RowDataPacket } from 'mysql2/promise';

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserWithId extends User {
  user_id: number;
}

export interface UserRow extends RowDataPacket, UserWithId {}
