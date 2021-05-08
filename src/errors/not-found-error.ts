import CustomError from './custom-error';

export class NotFoundError extends CustomError {
  status_code = 404;

  constructor(private msg = 'Route not found') {
    super(msg);
  }

  serializeErrors() {
    return [
      { message: this.message },
    ];
  }
}
