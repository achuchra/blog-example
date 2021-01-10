import { body } from 'express-validator';

export const validateUser = () => [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Field "username" is required')
    .isLength({ max: 255 })
    .withMessage('Field "username" max length is 255 chars'),
  body('password')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('Field "password" must be min 5 chars long and max 20 chars long'),
  body('nick').isLength({ min: 3, max: 30 }).withMessage('Field "nick" must be at least 3 and maximum 30 chars long'),
  body('email').isEmail().withMessage('Email is invalid'),
];
