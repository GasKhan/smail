import { Request, Response } from 'express';
import {
  changeIsMarkedFlag,
  changeIsWatchedFlag,
  getEmailsService,
  moveEmailToOtherFolder,
  sendEmailService,
} from './emails.services';
import { EmailToSend } from '../models/email.model';

export const sendEmail = async (req: Request, res: Response) => {
  const { messageObj } = req.body;

  try {
    await sendEmailService(messageObj);
    res.status(200).send({ message: `Message was succesfully sent` });
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};

export const getEmailsFromFolder = async (req: Request, res: Response) => {
  const { folder_id } = req.query;

  try {
    if (folder_id) {
      const result = await getEmailsService(+folder_id);
      res.status(200).json(result);
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: 'Couldnt get messages' });
  }
};

export const moveEmailToFolder = async (req: Request, res: Response) => {
  const { emailFromFolderId, folderId } = req.body;
  try {
    await moveEmailToOtherFolder(folderId, emailFromFolderId);
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: 'Couldnt move message to another folder' });
  }
};

export const flagAsWatched = async (req: Request, res: Response) => {
  const { emailId, changeIsWatchedTo } = req.body;

  try {
    await changeIsWatchedFlag(emailId, changeIsWatchedTo);
    res.status(200).send({ message: 'Changed is_watched flag successfully' });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ message: 'Couldnt change flag to watched/unwatched' });
  }
};

export const flagAsMarked = async (req: Request, res: Response) => {
  const { emailId, isMarkedTo } = req.body;

  try {
    await changeIsMarkedFlag(emailId, isMarkedTo);
    res.status(200).send({ message: 'Changed is_marked flag successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Couldnt change flag to marked/unmarked' });
  }
};
