import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';
import { UserRouter } from './routes/users';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json());
app.use(
  cookieSession({
    signed: false,
    keys: ['asdasdasxcvxfd'],
  }),
);
app.use(UserRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
