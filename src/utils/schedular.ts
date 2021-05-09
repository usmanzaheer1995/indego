import cron from 'node-cron';

import fetchIndegoData from './fetch-indigo-data';

export default (process.env.ENABLE_CRON_JOB === 'true')
  ? cron.schedule('* * * * * *', () => {
    console.log('running job to fetch and save data from indego API...');
    try {
      fetchIndegoData();
    } catch (err) {
      console.error('error occurred while running job', err);
    }
  })
  : {};
