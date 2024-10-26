import Router, { Request, Response } from 'express';
import {
  flagAsMarked,
  flagAsWatched,
  getEmailsFromFolder,
  moveEmailToFolder,
  sendEmail,
} from './emails.controllers';

export const router = Router();

router.post('/', sendEmail);

router.get('/', getEmailsFromFolder);

router.patch('/toFolder', moveEmailToFolder);

router.patch('/flagAsWatched', flagAsWatched);

router.patch('/flagAsMarked', flagAsMarked);
