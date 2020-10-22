import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class ValidationRequestError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, ValidationRequestError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => ({ message: error.msg, field: error.param }));
  }
}
