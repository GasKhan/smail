import { Request, Response } from 'express';
import {
  changeIsMarkedFlag,
  changeIsWatchedFlag,
  deleteEmailsService,
  getEmailsService,
  getOneEmailService,
  moveEmailToOtherFolder,
  sendEmailService,
} from './emails.services';

export const sendEmail = async (req: Request, res: Response) => {
  const { messageObj } = req.body;

  try {
    await sendEmailService(messageObj);
    res.status(200).send({ message: `Email was succesfully sent` });
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};

export const deleteEmails = async (req: Request, res: Response) => {
  const { emailIds } = req.query;
  const emailIdsStr = Array.isArray(emailIds)
    ? emailIds.join(',')
    : (emailIds as string);
  try {
    await deleteEmailsService(emailIdsStr);
    res.status(200).send({ message: 'Emails was deleted' });
  } catch (e: any) {
    console.error(e);
    res.status(400).send({ message: e.message });
  }
};

export const getEmailsFromFolder = async (req: Request, res: Response) => {
  const { folder_id, offset, limit } = req.query;

  try {
    if (folder_id && offset && limit) {
      const result = await getEmailsService(+folder_id, +offset, +limit);
      res.status(200).json(result);
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: 'Couldnt get messages' });
  }
};

export const getOneEmail = async (req: Request, res: Response) => {
  const { messageId: emailId } = req.query;

  try {
    if (emailId) {
      const email = await getOneEmailService(+emailId);
      res.status(200).json(email);
    } else throw new Error('Email id was not provided');
  } catch (err: any) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

export const moveEmailToFolder = async (req: Request, res: Response) => {
  const { emailFromFolderIds, folderId } = req.body;
  try {
    await moveEmailToOtherFolder(folderId, emailFromFolderIds);
    res.status(200).send({ message: 'Moved message to another folder' });
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: 'Couldnt move message to another folder' });
  }
};

export const flagAsWatched = async (req: Request, res: Response) => {
  const { emailIds, changeIsWatchedTo } = req.body;

  try {
    await changeIsWatchedFlag(emailIds, changeIsWatchedTo);
    res.status(200).send({ message: 'Changed is_watched flag successfully' });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .send({ message: 'Couldnt change flag to watched/unwatched' });
  }
};

export const flagAsMarked = async (req: Request, res: Response) => {
  const { emailIds, isMarkedTo } = req.body;

  try {
    await changeIsMarkedFlag(emailIds, isMarkedTo);
    res.status(200).send({ message: 'Changed is_marked flag successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: 'Couldnt change flag to marked/unmarked' });
  }
};
