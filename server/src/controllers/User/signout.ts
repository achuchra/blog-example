import { Response, Request } from 'express';

export const signOut = (req: Request, res: Response) => {
  req.session = null;

  res.send({});
};
