import Router, { Request, Response } from 'express';
import {
  deleteEmails,
  flagAsMarked,
  flagAsWatched,
  getEmailsFromFolder,
  moveEmailToFolder,
  sendEmail,
} from './emails.controllers';
import { authenticateToken } from '../middleware/authenticateJWT';

export const router = Router();
router.use(authenticateToken);

router.post('/', sendEmail);

router.get('/', getEmailsFromFolder);

router.delete('/', deleteEmails);

router.patch('/toFolder', moveEmailToFolder);

router.patch('/flagAsWatched', flagAsWatched);

router.patch('/flagAsMarked', flagAsMarked);
