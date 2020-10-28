import { Response, Request } from 'express';

import { User } from '../../models/User';
import { NotAuthorizedError } from '../../errors/not-authorized';
import { NotFoundError } from '../../errors/not-found-error';

export const updateUser = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  const existingUser = await User.findById(req.currentUser.id);

  if (!existingUser) {
    throw new NotFoundError();
  }

  const { password, email, avatar } = req.body;

  existingUser.set({ password, email, avatar });
  await existingUser.save();

  res.status(200).send(existingUser);
};
