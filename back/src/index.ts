import express from 'express';
import dotenv from 'dotenv';
import { pool } from '../database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is working');
});

pool.query(`SELECT * FROM users`).then((res) => console.log(res[0]));

app.listen(port, () => console.log('Listening to port ' + port));
