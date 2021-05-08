export interface IWeatherAttrs {
  id: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
}

export interface IWeatherResponse {
  'dt': number;
  'sunrise': number;
  'sunset': number;
  'temp': number;
  'feels_like': number;
  'pressure': number;
  'humidity': number;
  'dew_point': number;
  'uvi': number;
  'clouds': number;
  'visibility': number;
  'wind_speed': number;
  'wind_deg': number;
  'weather': [
    {
      'id': number;
      'main': string;
      'description': string;
      'icon': string;
    },
  ];
}
