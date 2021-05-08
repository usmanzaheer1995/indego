import { sign } from 'jsonwebtoken';

export const generateStaticToken = () => {
  // generate jwt
  const jwt = sign({
    message: 'dummy static token',
  },
  process.env.JWT_KEY!);
  return jwt;
};
