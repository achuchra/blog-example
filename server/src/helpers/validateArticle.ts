import { body } from 'express-validator';
import mongoose from 'mongoose';

export const validateArticle = () => [
  body('title').notEmpty().withMessage('Title is required'),
  body('icon')
    .optional()
    .customSanitizer((value) => mongoose.Types.ObjectId(value)),
];
