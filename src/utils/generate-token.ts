import { sign } from 'jsonwebtoken';

export const generateStaticToken = () => {
  // generate static jwt - only for development and testing purpose
  const jwt = sign({
    message: 'dummy static token',
  },
  process.env.JWT_KEY!,
  {
    expiresIn: '30d',
  });
  return jwt;
};
