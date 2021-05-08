import axios from 'axios';

import { IWeatherResponse } from '../interfaces/weather.interface';

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/onecall/timemachine';
const PHILADELPHIA_COORDS = {
  latitude: 39.95378,
  longitude: -75.16374,
};

export const fetchWeatherData = async (at: string): Promise<IWeatherResponse> => {
  const weatherParams = {
    params: {
      lat: PHILADELPHIA_COORDS.latitude,
      lon: PHILADELPHIA_COORDS.longitude,
      appid: process.env.WEATHER_API_KEY,
      dt: new Date(at).valueOf() / 1000,
    },
  };

  try {
    const resp = await axios.get(WEATHER_URL, weatherParams);
    return resp.data?.current;
  } catch (err) {
    throw err;
  }
};
