import { Request, Response } from 'express';
import { Article } from '../../models/Article';

export const getAll = async (req: Request, res: Response) => {
  const existingArticles = await Article.find({});

  res.send(existingArticles);
};
