// @ts-nocheck
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Article } from '../../models/Article';
import { NotFoundError } from '../../errors/not-found-error';
import { User } from '../../models/User';

export const updatedArticle = async (req: Request, res: Response) => {
  const query = {
    _id: mongoose.Types.ObjectId(req.params.id),
  };

  const user = await User.findById(req.currentUser!.id);

  if (!user!.isAdmin) {
    query.authorId = mongoose.Types.ObjectId(req.currentUser!.id);
  }

  // Find existing article
  const existingArticle = await Article.findOne(query);

  // if not existg, throw new Error
  if (!existingArticle) {
    throw new NotFoundError();
  }

  // Add property from req.body to existingArticle
  existingArticle.set({ ...req.body });

  // Save existing article
  await existingArticle.save();

  res.status(201).send(existingArticle);
};
