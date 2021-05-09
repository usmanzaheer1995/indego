import request from 'supertest';
import { Types } from 'mongoose';

import app from '../../app';
import { Station } from '../../models/stations';
import { stationOne, stationTwo } from '../../test/fixtures';

const save = async () => {
  const station1 = Station.build({
    ...stationOne,
    _id: Types.ObjectId().toHexString(),
  });
  const station2 = Station.build({
    _id: Types.ObjectId().toHexString(),
    ...stationTwo,
  });
  const stations = await Promise.all([station1.save(), station2.save()]);
  return stations;
};

jest.mock(
  '../../utils/fetch-indigo-data.ts',
  () => jest.fn().mockImplementation(async () => {
    const stations = await save();
    return Promise.resolve(stations);
  }),
);

it('should save data', async () => {
  const { body } = await request(app)
    .post('/api/v1/store')
    .set('Authorization', global.setToken())
    .send()
    .expect(201);
  expect(body.data).toHaveLength(2);
});
