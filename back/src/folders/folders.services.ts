import { pool } from '../../database';

export const getFoldersService = async (user_id: number) => {
  const res = await pool.query(
    `
    SELECT folder_id AS folderId, folder_name AS folderName 
    FROM folders
    WHERE user_id = ?
    `,
    user_id
  );
  return res[0];
};
