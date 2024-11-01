import Router, { Request, Response } from 'express';
import {
  authenticateUserByEmail,
  logout,
  refreshAccessToken,
  registerUser,
} from './auth.controllers';

export const router = Router();

router.post('/login', authenticateUserByEmail);

router.post('/register', registerUser);

router.post('/refresh', refreshAccessToken);

router.post('/logout', logout);
