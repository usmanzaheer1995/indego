import request from 'supertest';
import { Types } from 'mongoose';

import app from '../../app';
import { Station } from '../../models/stations';
import { stationOne, stationTwo, weatherOne } from '../../test/fixtures';

const response = {
  message: 'Data fetched successfully',
  at: '2021-05-08T16:48:10.997Z',
  station: stationOne,
  weather: weatherOne,
};

jest.mock(
  '../../utils/fetch-weather-data.ts',
  () => jest.fn().mockImplementation(() => Promise.resolve(response)),
);

beforeEach(async () => {
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
});

describe('fetch snapshot of all stations', () => {
  it('should return a 403 when fetching stations without a token', async () => {
    await request(app)
      .get('/api/v1/snapshot')
      .query({ at: '2021-05-08T16:48:10.997Z' })
      .send()
      .expect(401);
  });

  it('should return a 400 when fetching stations without a date query param', async () => {
    await request(app)
      .get('/api/v1/snapshot')
      .set('Authorization', global.setToken())
      .send()
      .expect(400);
  });

  it('should return a 404 when no stations are found', async () => {
    await request(app)
      .get('/api/v1/snapshot')
      .set('Authorization', global.setToken())
      .query({ at: '2021-05-10T00:00:00' })
      .send()
      .expect(404);
  });

  it('should return a 200 when fetching stations with correct data', async () => {
    await request(app)
      .get('/api/v1/snapshot')
      .set('Authorization', global.setToken())
      .query({ at: '2021-05-06T00:00:00' })
      .send()
      .expect(200);
  });

  it('should return response with correct number of stations', async () => {
    const { body } = await request(app)
      .get('/api/v1/snapshot')
      .set('Authorization', global.setToken())
      .query({ at: '2021-05-06T00:00:00' })
      .send()
      .expect(200);
    expect(body.stations).toHaveLength(2);
  });
});

describe('fetch snapshot of a particular station', () => {
  it('should return a 403 when fetching a station without a token', async () => {
    await request(app)
      .get('/api/v1/snapshot/123')
      .query({ at: '2021-05-08T16:48:10.997Z' })
      .send()
      .expect(401);
  });

  it('should return a 400 when fetching a station without a date query param', async () => {
    await request(app)
      .get('/api/v1/snapshot/123')
      .set('Authorization', global.setToken())
      .send()
      .expect(400);
  });

  it('should return a 400 when fetching a station without a valid kioskId', async () => {
    await request(app)
      .get('/api/v1/snapshot/asd')
      .set('Authorization', global.setToken())
      .query({ at: '2021-05-08T16:48:10.997Z' })
      .send()
      .expect(400);
  });

  it('should return a 404 if station is not found', async () => {
    await request(app)
      .get('/api/v1/snapshot/12')
      .set('Authorization', global.setToken())
      .query({ at: '2021-05-08T16:48:10.997Z' })
      .send()
      .expect(404);
  });

  it('should return a station', async () => {
    const { body: { station } } = await request(app)
      .get('/api/v1/snapshot/3005')
      .set('Authorization', global.setToken())
      .query({ at: '2021-05-08T16:48:10.997Z' })
      .send()
      .expect(200);
    expect(station.kioskId).toEqual(stationTwo.kioskId);
  });
});
