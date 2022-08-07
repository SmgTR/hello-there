import { Response, Request } from 'express';

import Weather from '@/models/weather';

export const getWeather = async (req: Request, res: Response) => {
  const latestWeather = await Weather.findByPk(1);
  if (!latestWeather) {
    return res.status(400).json({ message: 'Something went wrong, try again later' });
  } else {
    return res.status(200).json(latestWeather);
  }
};
