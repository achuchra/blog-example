import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { Settings } from '../../config';
import { User } from '../../models/User';
import { NotAuthorizedError } from '../../errors/not-authorized';
import { NotFoundError } from '../../errors/not-found-error';
import { BadRequestError } from '../../errors/bad-request-error';

export const updateUser = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  if (!req.body.password) {
    throw new BadRequestError('Provide your current or new password');
  }

  const existingUser = await User.findById(req.currentUser.id);

  if (!existingUser) {
    throw new NotFoundError();
  }

  const { password, email, avatar } = req.body;
  const nick = req.body.nick || existingUser.nick;

  existingUser.set({ password, email, avatar, nick });

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username,
      nick: existingUser.nick,
    },
    Settings.JWT_KEY
  );

  req.session = {
    jwt: userJwt,
  };
  await existingUser.save();

  res.status(200).send(existingUser);
};
