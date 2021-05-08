import { Router } from 'express';

import { snapshotRouter } from './snapshot';
import { storeRouter } from './store';

const router = Router();

router.use('/snapshot', snapshotRouter);
router.use('/store', storeRouter);

export default router;
