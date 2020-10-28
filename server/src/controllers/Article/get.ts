import { Request, Response } from 'express';
import { Article } from '../../models/Article';
import { NotFoundError } from '../../errors/not-found-error';

export const getOne = async (req: Request, res: Response) => {
  const existingArticle = await Article.findById(req.params.id);

  if (!existingArticle) {
    throw new NotFoundError();
  }

  res.send(existingArticle);
};
