import mongoose from 'mongoose';

import { app } from './app';
import { Settings } from './config';

const startUp = () => {
  if (!Settings.MONGO_URI) {
    throw new Error('mongo_uri must be definied');
  }

  try {
    // Connect to mongoDB
    mongoose.connect(Settings.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to mongoDB');
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log('Listen on port 5000');
  });
};

startUp();
