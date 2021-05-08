import CustomError from './custom-error';

export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to database';

  status_code = 500;

  constructor() {
    super('Error connecting to db');
  }

  serializeErrors() {
    return [
      { message: this.reason },
    ];
  }
}
