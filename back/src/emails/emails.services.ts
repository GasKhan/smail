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

export const deleteEmailsService = async (emailIdsStr: string) => {
  await pool.query(
    ` DELETE FROM recipients
      WHERE email_id IN (${emailIdsStr})
`
  );
  await pool.query(
    ` DELETE FROM emails_folders
      WHERE email_id IN (${emailIdsStr})
`
  );
  await pool.query(
    `
      DELETE FROM emails
      WHERE email_id IN (${emailIdsStr})
    `
  );
};

export const getEmailsService = async (folder_id: number) => {
  const res = await pool.query(
    `
  SELECT e.email_id AS emailId, title, e.text_body AS textBody, e.sender_id AS senderId, e.sent_at AS sentAt,
    e.is_watched AS isWatched, e.is_marked AS changeIsMarkedFlag, u.user_name as senderName,e_f.folder_id AS folderId, e_f.email_folder_id AS emailFromFolderId
  FROM emails AS e
  INNER JOIN users AS u
  ON u.user_id = e.sender_id
  INNER JOIN emails_folders AS e_f
  ON e.email_id = e_f.email_id
  WHERE folder_id = ?;
    `,
    [folder_id]
  );
  return res[0];
};

export const moveEmailToOtherFolder = async (
  folderId: number,
  messageFromFolderIds: number[]
) => {
  const idsQueryStr = messageFromFolderIds.join(',');
  const res = await pool.query(
    `
    UPDATE emails_folders
    SET folder_id = ${folderId}
    WHERE email_folder_id IN (${idsQueryStr})`
  );
  console.log(res);
  return res[0];
};

export const changeIsWatchedFlag = async (
  emailIds: number[],
  changeIsWatchedTo: boolean
) => {
  const res = await pool.query(
    `UPDATE emails
    SET is_watched = ?
    WHERE email_id IN (?)
    `,
    [changeIsWatchedTo, ...emailIds]
  );
  return res[0];
};

export const changeIsMarkedFlag = async (
  emailId: number[],
  isMarkedTo: boolean
) => {
  const res = await pool.query(
    `UPDATE emails
    SET is_marked = ?
    WHERE email_id IN (?)
    `,
    [isMarkedTo, ...emailId]
  );
  return res[0];
};

// UPDATE emails_folders
// SET folder_id = 52
// WHERE email_folder_id = 27;

// UPDATE emails
// SET is_watched = true
// WHERE email_id = 21;
