import axios from 'axios';
import { PHILADELPHIA_COORDS, WEATHER_URL } from '../constants';

import { IWeatherResponse } from '../interfaces/weather.interface';

export default async (at: string): Promise<IWeatherResponse> => {
  const weatherParams = {
    params: {
      lat: PHILADELPHIA_COORDS.latitude,
      lon: PHILADELPHIA_COORDS.longitude,
      appid: process.env.WEATHER_API_KEY,
      dt: new Date(at).valueOf() / 1000,
      units: 'metric',
    },
  };

  try {
    const resp = await axios.get(WEATHER_URL, weatherParams);
    return resp.data?.current;
  } catch (err) {
    throw err;
  }
};
