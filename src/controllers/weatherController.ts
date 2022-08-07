import { Response, Request } from 'express';

import Weather from '@/models/weather';
import { setWeather } from '@/utils/weatherCron';

export const getWeather = async (req: Request, res: Response) => {
  const latestWeather = await Weather.findByPk(1);
  if (!latestWeather) {
    //better ux -  create new record if not set by cron yet.
    await setWeather();
    const item = await Weather.findByPk(1);
    if (!item) {
      return res.status(400).json('Something went wrong, please try again later');
    }
    return res.status(200).json(item);
  } else {
    return res.status(200).json(latestWeather);
  }
};
