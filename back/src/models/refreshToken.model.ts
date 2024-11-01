import { RowDataPacket } from 'mysql2/promise';

interface RefreshToken {
  token_id: number;
  user_id: number;
  token: string;
}
export interface RefreshTokenRow extends RowDataPacket, RefreshToken {}

export interface JwtPayload {
  email: string;
  iat?: number;
  exp?: number;
}
