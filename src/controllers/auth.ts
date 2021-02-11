import { Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import config from '../config/db-config';
import User, { UserProps } from '../models/User';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists)
    return res.status(400).send('User with that email already exists.');

  const newUser: UserProps = new User({
    username,
    email,
    password,
  });

  try {
    const createdUser = await newUser.save();
    const token = jwt.sign({ _id: createdUser._id }, config.jwtSecret, {
      expiresIn: 86400,
    });

    res.header('auth-token', token).json(createdUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('There is no account with such email.');
  }

  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return res.status(400).json('Invalid password.');
  }

  const token = jwt.sign({ _id: user._id }, config.jwtSecret);

  res.header('auth-token', token).json(user);
};
