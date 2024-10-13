import Router, { Request, Response } from 'express';
import { getEmailsFromFolder, sendEmail } from './emails.controllers';

export const router = Router();

router.post('/', sendEmail);

router.get('/', getEmailsFromFolder);
