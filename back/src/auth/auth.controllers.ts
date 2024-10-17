import { Request, Response } from 'express';
import { createNewUser, getUserByEmail } from './auth.services';

export const authenticateUserByEmail = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userData = await getUserByEmail(email);
    const user = userData[0];

    if (user && user.password === password)
      res.status(200).json({
        id: user.user_id,
        email: user.email,
        username: user.user_name,
      });
    else res.status(401).send('Email or password is invalid');
  } catch (e) {
    console.error(e);
    res.status(400).send('Something went wrong');
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { user_name, email, password } = req.body;
  try {
    const result = await createNewUser({ user_name, email, password });
    res
      .status(200)
      .json({ message: `User with username ${user_name} was created` });
  } catch (e) {
    console.error(e);
    res.status(400).send('User with email ' + email + ' already exists');
  }
};
