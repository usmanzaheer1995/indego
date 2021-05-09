import { Router, Request, Response } from 'express';
import { param, query } from 'express-validator';

import { validateRequest } from '../middlewares/validate-request';
import { isValidDate } from '../utils/custom-validators';
import fetchWeatherData from '../utils/fetch-weather-data';
import { Station } from '../models/stations';
import { NotFoundError } from '../errors/not-found-error';
import { IStationAttrs } from '../interfaces/station.interface';
import { IWeatherResponse } from '../interfaces/weather.interface';

export const snapshotRouter = Router();

// @route   GET api/v1/snapshot?at=date
// @desc    Get snapshot of all stations at a specified time
// @access  Private
snapshotRouter.get(
  '/',
  [
    query('at')
      .notEmpty()
      .custom(isValidDate)
      .withMessage('at must be valid date'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { at } = req.query;

    let data: IStationAttrs[];
    let weatherData: IWeatherResponse | null = null;

    try {
      data = await Station.find({ createdAt: { $gte: new Date(at as string) } }).lean();

      if (data?.length === 0) {
        throw new NotFoundError('no stations found for the specified date');
      }
    } catch (err) {
      throw err;
    }

    try {
      weatherData = await fetchWeatherData(new Date(at as string).toString());
    } catch (err) {
      if (err.response.status !== 400) {
        throw err;
      }
      console.error(err.message);
    }

    return res.status(200).send({
      message: 'Data fetched successfully',
      at: data[0].createdAt,
      stations: data,
      weather: weatherData,
    });
  },
);

// @route   GET api/v1/snapshot/:kioskId?at=date
// @desc    Get snapshot of one station at a specified time
// @access  Private
snapshotRouter.get(
  '/:kioskId',
  [
    param('kioskId')
      .isNumeric()
      .withMessage('kioskId must be numeric'),
    query('at')
      .notEmpty()
      .custom(isValidDate)
      .withMessage('query param at must be valid date'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { kioskId } = req.params;
    const { at } = req.query;

    let data: IStationAttrs;
    let weatherData: IWeatherResponse | null = null;

    try {
      data = await Station.findOne({
        kioskId: parseInt(kioskId, 10),
        createdAt: { $gte: new Date(at as string) },
      }).lean();

      if (!data) {
        throw new NotFoundError('no stations found for the specified kioskId and date');
      }
    } catch (err) {
      throw err;
    }

    try {
      weatherData = await fetchWeatherData(new Date(at as string).toString());
    } catch (err) {
      if (err.code !== 400) {
        throw err;
      }
      console.error(err.message);
    }

    return res.status(200).send({
      message: 'Data fetched successfully',
      at: data.createdAt,
      station: data,
      weather: weatherData,
    });
  },
);
