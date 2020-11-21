import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized';

export const reqiredUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req);
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};
