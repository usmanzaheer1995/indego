import { Router, Request, Response } from 'express';

export const storeRouter = Router();

// @route   POST api/vi/store
// @desc    Fetch data from indego API and store in db
// @access  Private
storeRouter.post('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Hello from store router' });
});
