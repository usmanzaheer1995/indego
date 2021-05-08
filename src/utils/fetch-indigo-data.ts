import axios from 'axios';

import { INDEGO_API_URL } from '../constants';
import { Station } from '../models/stations';

export const fetchIndegoData = async () => {
  try {
    const stations = await axios.get<{ features: any[], type: string }>(INDEGO_API_URL);
    const { features } = stations.data;
    const properties = features.map((item) => item.properties);

    console.info('Data fetched, now inserting into db...');
    const stationsToInsert = properties.map((property) => (
      Station.build({
        ...property,
      })
    ));
    const docs = await Station.collection.insertMany(stationsToInsert);

    console.info('Data inserted successfully!');
    return docs.ops;
  } catch (error) {
    throw error;
  }
};
