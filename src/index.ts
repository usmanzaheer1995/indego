import mongoose from 'mongoose';
import { join } from 'path';
import * as dotenv from 'dotenv';

import app from './app';

dotenv.config({ path: join(__dirname, '..', '.env') });

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to mongodb!');
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

start();
