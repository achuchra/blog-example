import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import path from 'path';

import { errorHandler } from './middlewares/error-handler';
import { UserRouter } from './routes/users';
import { NotFoundError } from './errors/not-found-error';
import { currentUser } from './middlewares/current-user';
import { ArticleRouter } from './routes/atricles';

const app = express();

app.use(json());
app.use(
  cookieSession({
    signed: false,
    keys: ['asdasdasxcvxfd'],
  })
);

app.use(currentUser);

app.use(UserRouter);
app.use(ArticleRouter);
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
