import CustomError from './custom-error';

export class NotAuthorizedError extends CustomError {
  status_code = 401;

  constructor() {
    super('not authorized');
  }

  serializeErrors() {
    return [
      { message: 'not authorized' },
    ];
  }
}
