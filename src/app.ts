import express, { urlencoded, json } from 'express';
import 'express-async-errors';
import cors from 'cors';

// TODO: enable this to test cron job
// import './utils/schedular';

import errorHandler from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { requireToken } from './middlewares/require-token';
import router from './routes/routes';

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(cors());

app.use(requireToken);

app.use('/api/v1', router);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app as default };
