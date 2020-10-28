import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 403;

  constructor() {
    super('Not Authorized operation');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Access denied!' }];
  }
}
