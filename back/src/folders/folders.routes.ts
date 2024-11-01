import Router, { Request, Response } from 'express';
import { getFolders } from './folders.controllers';
import { authenticateToken } from '../middleware/authenticateJWT';

export const router = Router();
router.use(authenticateToken);

router.get('/', getFolders);
