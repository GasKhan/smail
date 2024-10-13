import { pool } from '../../database';
import { Folders } from '../models/emailFolders.model';
import { User, UserRow } from '../models/user.model';

export const getUserByEmail = async (email: string) => {
  const res = await pool.query<UserRow[]>(
    `SELECT * FROM users WHERE email=?`,
    email
  );
  return res[0];
};

export const createNewUser = async (userData: User) => {
  const { user_name, email, password } = userData;

  await pool.query(
    ` INSERT INTO users (user_name, email, password)
      VALUES ("?","?","?")`,
    [user_name, email, password]
  );

  await pool.query(`SELECT LAST_INSERT_ID() INTO @mysql_variable`);

  await pool.query(`INSERT INTO folders (user_id, folder_name)
      VALUES  (@mysql_variable, "${Folders.Recieved}"),
              (@mysql_variable, "${Folders.Sent}"),
              (@mysql_variable, "${Folders.Spam}"),
              (@mysql_variable, "${Folders.TrashFolder}")`);
  return;
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
