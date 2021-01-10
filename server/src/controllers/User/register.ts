import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models/User';
import { BadRequestError } from '../../errors/bad-request-error';
import { Settings } from '../../config';

export const registerUser = async (req: Request, res: Response) => {
  const existedUser = await User.findOne({ username: req.body.username });

  if (existedUser) {
    throw new BadRequestError('User with this username already exists!');
  }

  const newUser = User.build({
    username: req.body.username,
    nick: req.body.nick,
    password: req.body.password,
    email: req.body.email,
    avatar: req.body.avatar,
  });

  const user = await newUser.save();

  const userJwt = jwt.sign(
    {
      id: user.id,
      username: user.username,
      nick: user.nick,
    },
    Settings.JWT_KEY
  );

  req.session = {
    jwt: userJwt,
  };

  res.send(newUser);
};
