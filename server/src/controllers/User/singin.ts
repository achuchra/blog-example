import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { Settings } from '../../config';
import { User } from '../../models/User';
import { BadRequestError } from '../../errors/bad-request-error';
import { Password } from '../../helpers/Password';

export const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (!existingUser) {
    throw new BadRequestError('Invalid creditionals');
  }

  const passwordMatch = await Password.compare(existingUser.password, password);

  if (!passwordMatch) {
    throw new BadRequestError('Invalid creditionals');
  }

  const userJwt = jwt.sign(
    {
      id: existingUser.id,
      username: existingUser.username,
    },
    Settings.JWT_KEY,
  );

  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(existingUser);
};
