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
    .withMessage(
      'Field "password" must be min 5 chars long and max 20 chars long'
    ),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Email is invalid'),
];
