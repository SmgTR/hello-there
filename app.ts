import 'dotenv/config';

import sequelize from '@/utils/database';

import createServer from '@/utils/server';
import { setWeather } from '@/utils/weatherCron';

const app = createServer();

setWeather.start();

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err: any) => {
    console.log({ message: 'Something went wrong, try again later.', err });
  });
