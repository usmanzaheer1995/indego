import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { join } from 'path';

import { requireToken } from '../middlewares/require-token';
import { snapshotRouter } from './snapshot';
import { storeRouter } from './store';

// https://stackoverflow.com/questions/53968759/how-to-use-ref-in-swagger-file-properly-while-working-with-swagger-ui-express-a
const router = Router();
const swaggerDocument = YAML.load(join(__dirname, '..', 'swagger', 'swagger.yaml'));

router.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);
router.use('/snapshot', requireToken, snapshotRouter);
router.use('/store', requireToken, storeRouter);

export default router;
