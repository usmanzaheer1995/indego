import {
  Schema,
  model,
  Model,
  Document,
} from 'mongoose';

import { IWeatherAttrs } from '../interfaces/weather.interface';

interface IWeatherDoc extends Document {
  id: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
}

interface IWeatherModel extends Model<IWeatherDoc> {
  build(attrs: IWeatherAttrs): IWeatherDoc;
}

const weatherScheme = new Schema({
  temp: { type: Number },
  feelsLike: { type: Number },
  tempMin: { type: Number },
  tempMax: { type: Number },
  pressure: { type: Number },
  humidity: { type: Number },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      ret._id = undefined;
    },
  },
});

weatherScheme.index({ createdAt: 1 });

const Weather = model<IWeatherDoc, IWeatherModel>('Weather', weatherScheme);

weatherScheme.statics.build = (attrs: IWeatherAttrs) => new Weather({
  _id: attrs.id,
  ...attrs,
});

export { Weather };
