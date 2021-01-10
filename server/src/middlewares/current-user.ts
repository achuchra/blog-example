import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Settings } from '../config';

interface UserPayload {
  nick: string;
  id: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      session?: any;
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, Settings.JWT_KEY) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  return next();
};
