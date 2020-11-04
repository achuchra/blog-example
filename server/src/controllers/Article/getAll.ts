import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Article } from '../../models/Article';
import { User } from '../../models/User';
import { BadRequestError } from '../../errors/bad-request-error';

interface Query {
  page?: number;
  limit?: number;
  search?: string;
}

export const getAll = async (req: Request, res: Response) => {
  const { page, limit, search }: Query = req.query;
  const querParams: any = {};

  // If we are seraching other authors
  if (req.query.author && req.query.author !== 'me') {
    const existingAuthor = await User.findOne({ username: req.query.author.toString() });

    if (!existingAuthor) {
      throw new BadRequestError("Author with supplied name does'nt exist!");
    }

    querParams.author = existingAuthor._id;
  }

  // If i want to display my collection
  if (req.query.author === 'me' && req.currentUser) {
    querParams.author = mongoose.Types.ObjectId(req.currentUser.id);
  }

  if (search) {
    querParams.title = new RegExp(search, 'i');
  }

  const existingArticles = await Article.paginate(querParams, {
    limit: limit || 2,
    page: page || 1,
  });

  res.send(existingArticles);
};
