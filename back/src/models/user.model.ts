import { RowDataPacket } from 'mysql2/promise';

export interface User {
  user_name: string;
  email: string;
  password: string;
}

export interface UserWithId extends User {
  id: number;
}

export interface UserRow extends RowDataPacket, UserWithId {}
