import { CustomValidator } from 'express-validator';

export const isValidDate: CustomValidator = (value) => {
  const date = new Date(value);
  if (date.toString() === 'Invalid Date') {
    return false;
  }
  return true;
};
