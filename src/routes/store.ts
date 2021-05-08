import { Router, Request, Response } from 'express';

import { fetchIndegoData } from '../utils/fetch-indigo-data';

export const storeRouter = Router();

// @route   POST api/vi/store
// @desc    Fetch data from indego API and store in db
// @access  Private
storeRouter.post('/', async (req: Request, res: Response) => {
  try {
    const data = await fetchIndegoData();
    res.status(201).send({
      message: 'Successfully inserted indego data',
      data,
    });
  } catch (err) {
    throw err;
  }
});
