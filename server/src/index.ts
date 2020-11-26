import mongoose from 'mongoose';

import { app } from './app';
import { Settings } from './config';

const startUp = async () => {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.MONGO_URI) {
      throw new Error('mongo_uri must be definied');
    }
    if (!process.env.JWT_KEY) {
      throw new Error('jwt_key must be definied');
    }
  } else {
    if (!Settings.MONGO_URI) {
      throw new Error('mongo_uri must be definied');
    }
    if (!Settings.JWT_KEY) {
      throw new Error('jwt_key must be definied');
    }
  }

  try {
    // Connect to mongoDB
    await mongoose.connect(Settings.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to mongoDB');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  app.listen(5000, () => {
    console.log('Listen on port 5000');
  });
};

startUp();
