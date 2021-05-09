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
    throw new NotAuthorizedError();
  }

  token = token.replace('Bearer ', '');

  try {
    const payload = verify(token, process.env.JWT_KEY!);
  } catch (error) {
    throw new NotAuthorizedError();
  }

  return next();
};
