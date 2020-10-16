import express from 'express';
import { json } from 'body-parser';

import { UserRouter } from './routes/users';

const app = express();

app.use(json());
app.use(UserRouter);

export { app };
