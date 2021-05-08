import { ValidationError } from 'express-validator';
import CustomError from './custom-error';

export class RequestValidationError extends CustomError {
  status_code = 400;

  constructor(private errors: ValidationError[]) {
    super('Invalid request parameters');
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.param,
    }));
  }
}
