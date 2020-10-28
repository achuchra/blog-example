import { body } from 'express-validator';

export const validateArticle = () => [body('title').notEmpty().withMessage('Title is required')];
