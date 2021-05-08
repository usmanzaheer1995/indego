import cron from 'node-cron';

import { fetchIndegoData } from './fetch-indigo-data';

export default cron.schedule('0 0 */1 * * *', () => {
  console.log('running job to fetch and save data from indego API...');
  try {
    fetchIndegoData();
  } catch (err) {
    console.error('error occurred while running job', err);
  }
});
