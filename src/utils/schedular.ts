import cron from 'node-cron';

import fetchIndegoData from './fetch-indigo-data';

// if env variable is set to true, this job will run after every hour
export default (process.env.ENABLE_CRON_JOB === 'true')
  ? cron.schedule('0 0 */1 * * *', () => {
    console.log('running job to fetch and save data from indego API...');
    try {
      fetchIndegoData();
    } catch (err) {
      console.error('error occurred while running job', err);
    }
  })
  : {};
