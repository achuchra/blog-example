import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { Settings } from '../../config';
import { User } from '../../models/User';

interface UserPayload {
  id: string;
  username: string;
}

export const currentUser = async (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, Settings.JWT_KEY) as UserPayload;

    const user = await User.findById(payload.id);

    return res.send({ currentUser: user });
  } catch (err) {
    return res.send({ currentUser: null });
  }
};
