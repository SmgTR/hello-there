import 'dotenv/config';

import sequelize from '@/utils/database';

import createServer from '@/utils/server';
import { setWeatherCron } from '@/utils/weatherCron';

const app = createServer();

setWeatherCron.start();

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err: any) => {
    console.log({ message: 'Something went wrong, try again later.', err });
  });
