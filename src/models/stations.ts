import {
  Schema,
  model,
  Model,
  Document,
} from 'mongoose';

import { IBikeAttrs } from '../interfaces/bike.interface';
import { IStationAttrs } from '../interfaces/station.interface';

interface IStationDoc extends Document {
  id: string;
  name: string;
  totalDocks: number;
  docksAvailable: number;
  bikesAvailable: number;
  classicBikesAvailable: number;
  smartBikesAvailable: number;
  electricBikesAvailable: number;
  rewardBikesAvailable: number;
  rewardDocksAvailable: number;
  kioskStatus: string;
  kioskPublicStatus: string;
  kioskConnectionStatus: string;
  kioskType: number;
  kioskId: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  closeTime?: string;
  eventEnd?: string;
  eventStart?: string;
  isEventBased: boolean;
  isVirtual: boolean;
  notes?: string;
  openTime?: string;
  publicText: string;
  timeZone: string;
  trikesAvailable: number;
  latitude: string;
  longitude: string;
  bikes: IBikeAttrs[];
}

interface IStationsModel extends Model<IStationDoc> {
  build(attrs: IStationAttrs): IStationDoc;
}

const stationScheme = new Schema({
  name: { type: String, required: true },
  totalDocks: { type: Number },
  docksAvailable: { type: Number },
  bikesAvailable: { type: Number },
  classicBikesAvailable: { type: Number },
  smartBikesAvailable: { type: Number },
  electricBikesAvailable: { type: Number },
  rewardBikesAvailable: { type: Number },
  rewardDocksAvailable: { type: Number },
  kioskStatus: { type: String },
  kioskPublicStatus: { type: String },
  kioskConnectionStatus: { type: String },
  kioskType: { type: Number },
  kioskId: { type: String, required: true },
  addressStreet: { type: String },
  addressCity: { type: String },
  addressState: { type: String },
  addressZipCode: { type: String },
  closeTime: { type: String },
  eventEnd: { type: String },
  eventStart: { type: String },
  isEventBased: { type: Boolean },
  isVirtual: { type: Boolean },
  notes: { type: String },
  openTime: { type: String },
  publicText: { type: String },
  timeZone: { type: String },
  trikesAvailable: { type: Number },
  latitude: { type: String },
  longitude: { type: String },
  bikes: [{
    dockNumber: { type: Number, required: true },
    isElectric: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    battery: { type: String },
  }],
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      ret._id = undefined;
    },
  },
});

stationScheme.index({ createdAt: 1 });

const Station = model<IStationDoc, IStationsModel>('Station', stationScheme);

stationScheme.statics.build = (attrs: IStationAttrs) => new Station({
  _id: attrs.id,
  ...attrs,
});

export { Station };
