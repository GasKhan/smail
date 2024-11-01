import { pool } from '../../database';
import { RefreshTokenRow } from '../models/refreshToken.model';

export const saveTokenInDB = async (token: string, userId: number) => {
  const tokenFromDB = await pool.query<RefreshTokenRow[]>(
    `
    SELECT * FROM refresh_tokens
    WHERE user_id LIKE ?
    `,
    userId
  );

  const oldTokenData = tokenFromDB[0];
  if (oldTokenData.length) {
    await pool.query(
      `UPDATE refresh_tokens
    SET token = ?
    WHERE token_id = ?
    `,
      [token, oldTokenData[0].token_id]
    );
  } else {
    await pool.query(
      `INSERT INTO refresh_tokens (user_id, token)
      VALUES (?, ?)
      `,
      [userId, token]
    );
  }
};
