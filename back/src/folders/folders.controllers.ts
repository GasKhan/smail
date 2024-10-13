import { Request, Response } from 'express';
import { getFoldersService } from './folders.services';

export const getFolders = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  try {
    const folders = await getFoldersService(user_id);
    res.status(200).json(folders);
  } catch (e) {
    console.error(e);
    res.status(400).send('Could not get folders');
  }
};
