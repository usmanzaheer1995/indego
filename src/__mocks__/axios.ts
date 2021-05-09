import { stationOne, weatherOne } from '../test/fixtures';

const response = {
  message: 'Data fetched successfully',
  at: '2021-05-08T16:48:10.997Z',
  station: stationOne,
  weather: weatherOne,
};

export const axios = {
  get: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve(response)),
};
