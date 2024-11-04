import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  checkRefreshTokenInDb,
  createNewUser,
  deleteRefreshTokenFromDb,
  getUserByEmail,
} from './auth.services';
import { saveTokenInDB } from '../utils/saveToken';
import { generateTokens } from '../utils/generateJWT';

export const authenticateUserByEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await getUserByEmail(email);
    const userData = result[0];

    if (userData && userData.password === password) {
      const user = {
        email: userData.email,
        id: userData.user_id,
        username: userData.username,
      };
      const tokens = generateTokens(user);
      saveTokenInDB(tokens.refreshToken, user.id);
      res.status(200).json({ user, tokens });
    } else res.status(401).send('Email or password is invalid');
  } catch (e) {
    console.error(e);
    res.status(400).send('Something went wrong');
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const result = await createNewUser({ username, email, password });
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(400).send('User with email ' + email + ' already exists');
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new Error('Missing refresh token');

  const isRefreshTokenInDb = await checkRefreshTokenInDb(
    refreshToken as string
  );
  if (!isRefreshTokenInDb) throw new Error('Refresh token is not in db');

  try {
    jwt.verify(
      refreshToken as string,
      process.env.AUTH_REFRESH_TOKEN_SECRET as jwt.Secret,
      (err, userData) => {
        if (err) {
          throw new Error(err.message);
        }
        const data = userData as JwtPayload;
        const user = {
          email: data.email,
          id: data.id,
        };

        const { accessToken } = generateTokens(user);
        res.status(200).json({ accessToken });
      }
    );
  } catch (err: any) {
    console.log(err);
    res.status(403).send({ message: err.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) res.status(401).send({ message: 'Missing refresh token' });

  try {
    await deleteRefreshTokenFromDb(refreshToken);
    res.status(200).send({ message: 'Logged out succesfully' });
  } catch (err: any) {
    console.log(err);
    res.status(403).send({ message: err.message });
  }
};
