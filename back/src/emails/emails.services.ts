import { pool } from '../../database';
import { Folders } from '../models/emailFolders.model';
import { Email } from '../models/email.model';

export const sendEmailService = async (
  messageObj: Email,
  recipientUserEmail: string
) => {
  // const recipient_id = await pool.query(`
  //   SELECT user_id from users WHERE user_name LIKE '%test%'
  //   `);
  // console.log(recipient_id);

  const { sender_id, title, text_body, sent_at } = messageObj;

  await pool.query(
    `INSERT INTO emails (sender_id, title, text_body, sent_at)
    VALUES (?,?,?,?)
    `,
    [sender_id, title, text_body, sent_at]
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
      VALUES (@mysql_variable, SELECT user_id from users WHERE user_name LIKE '%test%')`
  );

  await pool.query(
    `INSERT INTO emails_folders (email_id, folder_id)
      VALUES (@mysql_variable,
       (SELECT folder_id FROM folders WHERE (user_id = SELECT user_id from users WHERE user_name LIKE '%test%') AND folder_name = "${Folders.Recieved}"))`
  );
};

export const getEmailsService = async (folder_id: number) => {
  const res = await pool.query(
    `
    SELECT e.email_id AS emailId, title, e.text_body AS textBody, e.sender_id AS senderId, e.sent_at AS sentAt, e.is_watched AS isWatched, e.is_marked AS isMarked, e_f.folder_id AS folderId
    FROM emails AS e
    INNER JOIN
      (SELECT * FROM emails_folders
      WHERE folder_id = ?) AS e_f
      ON e.email_id = e_f.email_id
    `,
    [folder_id]
  );
  return res[0];
};
