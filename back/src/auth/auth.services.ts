import { RowDataPacket } from 'mysql2/promise';
import { pool } from '../../database';
import { Folders } from '../models/emailFolders.model';
import { User, UserRow } from '../models/user.model';
import { generateTokens } from '../utils/generateJWT';
import { saveTokenInDB } from '../utils/saveToken';
import { RefreshTokenRow } from '../models/refreshToken.model';

export const getUserByEmail = async (email: string) => {
  const res = await pool.query<UserRow[]>(
    `SELECT * FROM users WHERE email  LIKE '%${email}%'`
  );
  return res[0];
};

export const createNewUser = async (userData: User) => {
  const { username, email, password } = userData;
  const tokens = generateTokens(userData);

  await pool.query(
    ` INSERT INTO users (user_name, email, password)
      VALUES (?,?,?)`,
    [username, email, password]
  );

  await pool.query(`SELECT LAST_INSERT_ID() INTO @mysql_variable`);

  await pool.query(`INSERT INTO folders (user_id, folder_name)
      VALUES  (@mysql_variable, "${Folders.Recieved}"),
              (@mysql_variable, "${Folders.Sent}"),
              (@mysql_variable, "${Folders.Spam}"),
              (@mysql_variable, "${Folders.TrashFolder}")`);

  const res = await pool.query<UserRow[]>(
    `SELECT * FROM users WHERE email  LIKE '%${email}%'`
  );

  await saveTokenInDB(tokens.refreshToken, res[0][0].user_id);

  return { userData: res[0], tokens };
};

export const checkRefreshTokenInDb = async (refreshToken: string) => {
  const res = await pool.query<RefreshTokenRow[]>(
    `SELECT * FROM refresh_tokens
    WHERE token LIKE ?
    `,
    refreshToken
  );
  return res[0].length > 0;
};

export const deleteRefreshTokenFromDb = async (refreshToken: string) => {
  const res = await pool.query<RefreshTokenRow[]>(
    `DELETE FROM refresh_tokens
    WHERE token = ?
    `,
    refreshToken
  );
  return res[0];
};

// BEGIN;
//       INSERT INTO users (user_name, email, password)
//       VALUES (?,?,?);

//       SELECT LAST_INSERT_ID() INTO @mysql_variable;

//       INSERT INTO folders (user_id, folder_name)
//       VALUES  (@mysql_variable, "recieved"),
//               (@mysql_variable, "sent"),
//               (@mysql_variable, "spam");
//     COMMIT;
