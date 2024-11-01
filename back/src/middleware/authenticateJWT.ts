import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (
  req: Request & { userData?: any },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    throw new Error('Access token is missing');
    // res.status(401).json({ message: 'Access token is missing' });
  } else
    jwt.verify(
      token,
      process.env.AUTH_ACCESS_TOKEN_SECRET as jwt.Secret,
      (err, userData) => {
        if (err) {
          throw new Error('Invalid or expired token');
          // res.status(401).json({ message: 'Invalid or expired token' });
        }

        req.userData = userData;
      }
    );
  next();
};
