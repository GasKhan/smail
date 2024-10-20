import { Request, Response } from 'express';
import { getEmailsService, sendEmailService } from './emails.services';

export const sendEmail = async (req: Request, res: Response) => {
  const { messageObj, recipientUserEmail } = req.body;
  try {
    await sendEmailService(messageObj, recipientUserEmail);
    res.status(200).send({ message: `Message was succesfully sent` });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: 'Could not send the message' });
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
