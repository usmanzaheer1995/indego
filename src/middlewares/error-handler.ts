import { Request, Response, NextFunction } from 'express';

import CustomError from '../errors/custom-error';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.status_code).send({ errors: err.serializeErrors() });
  }

  console.error(err);
  return res.status(400).send({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  });
};
