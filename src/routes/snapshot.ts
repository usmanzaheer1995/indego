import { Router, Request, Response } from 'express';
import { query, CustomValidator } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';

export const snapshotRouter = Router();

const isValidDate: CustomValidator = (value) => {
  const date = new Date(value);
  if (date.toString() === 'Invalid Date') {
    return false;
  }
  return true;
};

// @route   GET api/v1/snapshot?at=date
// @desc    Get snapshot of all stations at a specified time
// @access  Private
snapshotRouter.get(
  '/',
  [
    query('at')
      .notEmpty()
      .custom(isValidDate)
      .withMessage('at must be valid date'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    const { at } = req.query;

    console.log('at: ', at);
    return res.status(200).send({ message: 'Hello from snapshot Router' });
  },
);

// @route   GET api/v1/snapshot/:kioskId?at=date
// @desc    Get snapshot of one station at a specified time
// @access  Private
snapshotRouter.get(
  '/:kioskId',
  [
    query('at')
      .notEmpty()
      .custom(isValidDate)
      .isDate(),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    const { kioskId } = req.params;
    const { at } = req.query;

    console.log('at: ', at);
    console.log('kioskId: ', kioskId);

    return res.status(200).send({ message: 'Hello from snapshot kioskId Router' });
  },
);
