import express from "express";
import "express-async-errors";
import { json } from 'body-parser';

import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { requireToken } from "./middlewares/require-token";

const app = express();
app.use(json());

// TODO: enable this afterwards
// app.use(requireToken);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app as default };
