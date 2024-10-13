import Router, { Request, Response } from 'express';
import { getFolders } from './folders.controllers';

export const router = Router();

router.get('/', getFolders);
