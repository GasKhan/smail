import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router as authRouter } from './auth/auth.routes';
import { router as emailsRouter } from './emails/emails.routes';
import { router as foldersRouter } from './folders/folders.routes';
import { pool } from '../database';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is working');
});

app.use('/auth', authRouter);
app.use('/messages', emailsRouter);
app.use('/folders', foldersRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke on server side');
});

app.listen(port, () => console.log('Listening to port ' + port));
