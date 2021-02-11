import { Request, Response } from 'express';
import User, { UserProps } from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const newUser: UserProps = new User({ username, email, password });
  const user = await newUser.save();
  console.log(user)
};

export const login = async (req: Request, res: Response) => {
  res.send('login');
};
