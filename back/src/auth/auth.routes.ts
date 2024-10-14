import Router, { Request, Response } from 'express';
import { authenticateUserByEmail, registerUser } from './auth.controllers';

export const router = Router();

router.post('/login', authenticateUserByEmail);

router.post('/register', registerUser);