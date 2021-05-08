import CustomError from './custom-error';

export class NotFoundError extends CustomError {
  status_code = 404;

  constructor() {
    super('Route not found');
  }

  serializeErrors() {
    return [
      { message: 'Not found' },
    ];
  }
}
