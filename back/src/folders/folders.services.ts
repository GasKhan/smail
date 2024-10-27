import { pool } from '../../database';

export const getFoldersService = async (user_id: number) => {
  const res = await pool.query(
    `
    SELECT f.folder_id AS folderId, f.folder_name AS folderName, IFNULL(e_f.folder_count,0) AS totalMessages
    FROM folders AS f
    LEFT JOIN (
      SELECT folder_id, COUNT(folder_id) AS folder_count
      FROM emails_folders
      GROUP BY folder_id
    ) AS e_f ON f.folder_id = e_f.folder_id
      WHERE f.user_id = ?;
    `,
    user_id
  );
  return res[0];
};
