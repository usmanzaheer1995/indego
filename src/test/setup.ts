// https://www.robinwieruch.de/axios-jest
// https://stackoverflow.com/questions/61765291/testing-a-node-cron-job-function-with-jest
import { sign } from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

declare global {
  namespace NodeJS {
    interface Global {
      setToken(): string;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'random-test-string';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  // eslint-disable-next-line no-restricted-syntax
  for (const collection of collections) {
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.setToken = () => {
  const token = sign({ message: 'test_token' }, process.env.JWT_KEY!);
  return token;
};
