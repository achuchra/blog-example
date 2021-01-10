import { Response, Request } from 'express';

export const currentUser = async (req: Request, res: Response) => {
  const { currentUser } = req;
  res.send({ currentUser });
};
