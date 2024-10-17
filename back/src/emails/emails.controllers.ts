import { Request, Response } from 'express';
import { getEmailsService, sendEmailService } from './emails.services';

export const sendEmail = async (req: Request, res: Response) => {
  const { messageObj, recipientUserId } = req.body;
  try {
    await sendEmailService(messageObj, recipientUserId);
    res.status(200).send(`Message was succesfully sent`);
  } catch (e) {
    console.error(e);
    res.status(400).send('Could not send the message');
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
    res.status(400).send('Couldnt get messages');
  }
};
