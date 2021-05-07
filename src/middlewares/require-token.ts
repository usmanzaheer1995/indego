import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = req.header('Authorization') || req.header('x-auth-token');

  if (!token) {
    return new NotAuthorizedError();
  }

  token = token.replace('Bearer ', '');

  try {
    const payload = verify(token, process.env.JWT_KEY!);
    next();
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong');
  }

  next();
};
