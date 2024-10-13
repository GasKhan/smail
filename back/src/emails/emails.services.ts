import { pool } from '../../database';
import { Folders } from '../models/emailFolders.model';
import { Email } from '../models/email.model';

export const sendEmailService = async (
  messageObj: Email,
  recipientUserId: number
) => {
  console.log(recipientUserId);
  const { sender_id, title, text_body, sent_at, is_watched, is_marked } =
    messageObj;

  await pool.query(
    `INSERT INTO emails (sender_id, title, text_body, is_watched, is_marked, sent_at)
    VALUES (?,?,?,?,?,?)
    `,
    [sender_id, title, text_body, is_watched, is_marked, sent_at]
  );

  await pool.query(`SELECT LAST_INSERT_ID() INTO @mysql_variable`);

  await pool.query(
    `INSERT INTO emails_folders (email_id, folder_id)
      VALUES (@mysql_variable,
       (SELECT folder_id FROM folders WHERE user_id = ? AND folder_name = "${Folders.Sent}"))`,
    sender_id
  );

  await pool.query(
    `INSERT INTO recipients (email_id, user_id)
      VALUES (@mysql_variable, ?)`,
    recipientUserId
  );

  await pool.query(
    `INSERT INTO emails_folders (email_id, folder_id)
      VALUES (@mysql_variable,
       (SELECT folder_id FROM folders WHERE (user_id = ?) AND folder_name = "${Folders.Recieved}"))`,
    recipientUserId
  );
};

export const getEmailsService = async (folder_id: number) => {
  const res = await pool.query(
    `
    SELECT * FROM emails e
    INNER JOIN
      (SELECT email_id FROM emails_folders
      WHERE folder_id = ?) e_f
      ON e.email_id = e_f.email_id
    `,
    [folder_id]
  );
  return res[0];
};
