// @ts-nocheck
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Article } from '../../models/Article';
import { NotFoundError } from '../../errors/not-found-error';
import { User } from '../../models/User';

export const deleteArticle = async (req: Request, res: Response) => {
  const query = {
    _id: mongoose.Types.ObjectId(req.params.id),
  };

  const user = await User.findById(req.currentUser!.id);

  if (!user!.isAdmin) {
    query.author = mongoose.Types.ObjectId(req.currentUser!.id);
  }

  console.log(query);

  // Find existing article
  const existingArticle = await Article.findOne(query);

  // if not existg, throw new Error
  if (!existingArticle) {
    throw new NotFoundError();
  }

  // Save existing article
  await existingArticle.remove();

  res.status(201).send({ status: 'ok', message: 'Article removed' });
};
