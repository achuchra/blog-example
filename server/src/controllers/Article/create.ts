import { Request, Response } from 'express';
import { Article } from '../../models/Article';

export const createArticle = async (req: Request, res: Response) => {
  const { title, description, shortDescription, icon } = req.body;

  // Build new Article
  const articleNew = Article.build({
    title,
    description,
    shortDescription,
    icon,
    author: req.currentUser!.id,
  });

  // save article
  await articleNew.save();

  res.status(201).send(articleNew);
};
