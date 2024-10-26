import { pool } from '../../database';
import { Folders } from '../models/emailFolders.model';
import { Email, EmailToSend } from '../models/email.model';
import { RowDataPacket } from 'mysql2';

export const sendEmailService = async (messageObj: EmailToSend) => {
  const { recipientEmail } = messageObj;
  const res = await pool.query<RowDataPacket[]>(
    `
    SELECT user_id from users WHERE email LIKE '%${recipientEmail}%'
    `
  );
  if (!res[0].length) throw new Error('User doesnt exist');
  const resp = res[0] as [{ user_id: number }];
  const reciever_id = resp[0].user_id;

  const { senderId, title, textBody, sentAt } = messageObj;

  await pool.query(
    `INSERT INTO emails (sender_id, title, text_body, sent_at)
    VALUES (?,?,?,?)
    `,
    [senderId, title, textBody, sentAt]
  );

  await pool.query(`SELECT LAST_INSERT_ID() INTO @mysql_variable`);

  await pool.query(
    `INSERT INTO emails_folders (email_id, folder_id)
      VALUES (@mysql_variable,
       (SELECT folder_id FROM folders WHERE user_id = ? AND folder_name = "${Folders.Sent}"))`,
    senderId
  );

  await pool.query(
    `INSERT INTO recipients (email_id, user_id)
      VALUES (@mysql_variable, ${reciever_id})`
  ),
    [reciever_id];

  await pool.query(
    `INSERT INTO emails_folders (email_id, folder_id)
      VALUES (@mysql_variable,
       (SELECT folder_id FROM folders WHERE user_id = ? AND folder_name = "${Folders.Recieved}"))`,
    [reciever_id]
  );
};

export const getEmailsService = async (folder_id: number) => {
  const res = await pool.query(
    `
    SELECT e.email_id AS emailId, title, e.text_body AS textBody, e.sender_id AS senderId, e.sent_at AS sentAt, e.is_watched AS isWatched, e.is_marked AS isMarked, e_f.folder_id AS folderId, e_f.email_folder_id AS emailFromFolderId
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

export const moveEmailToOtherFolder = async (
  folderId: number,
  messageFromFolderId: number
) => {
  // console.log(folderId, messageFromFolderId);
  const res = await pool.query(
    `
    UPDATE emails_folders
    SET folder_id = ?
    WHERE email_folder_id = ?`,
    [folderId, messageFromFolderId]
  );
  return res[0];
};

export const changeIsWatchedFlag = async (
  emailId: number,
  changeIsWatchedTo: boolean
) => {
  const res = await pool.query(
    `UPDATE emails
    SET is_watched = ?
    WHERE email_id = ?
    `,
    [changeIsWatchedTo, emailId]
  );
  return res[0];
};

export const changeIsMarkedFlag = async (
  emailId: number,
  isMarkedTo: boolean
) => {
  const res = await pool.query(
    `UPDATE emails
    SET is_marked = ?
    WHERE email_id = ?
    `,
    [isMarkedTo, emailId]
  );
  return res[0];
};

// UPDATE emails_folders
// SET folder_id = 52
// WHERE email_folder_id = 27;

// UPDATE emails
// SET is_watched = true
// WHERE email_id = 21;
