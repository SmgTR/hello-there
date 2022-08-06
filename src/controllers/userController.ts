import { Response, Request } from 'express';

import bcrypt from 'bcrypt';
import { generateJWT } from '@/auth/jwtStrategy';

import { User } from '@/models';

type RequestCredentials = { email: string; password: string };

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as RequestCredentials;

    const userExist = await User.findOne({ where: { email } });

    if (userExist)
      return res.status(409).json({ message: 'User with provided email already exists' });

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email: email.toLowerCase(), password: hashPass });

    if (!newUser) throw new Error();

    return res.status(201).json({
      message: 'User created',
      user: {
        email: newUser.email,
        token: generateJWT(newUser.email, newUser.id)
      }
    });
  } catch (err) {
    return res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};

export const logInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as RequestCredentials;
    if (!email || !password) throw new Error();

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Email or password does not match!');
    }

    const comparePassword = await bcrypt.compare(password, user?.password);
    if (!comparePassword) return res.json({ message: 'Email or password does not match!' });

    const jwtToken = generateJWT(user.email, user.id);

    return res.json({ token: jwtToken });
  } catch {
    return res.status(400).json({ message: 'Something went wrong, check provided data' });
  }
};
