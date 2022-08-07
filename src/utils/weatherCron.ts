import nodeCron from 'node-cron';

import axios from 'axios';

import Weather from '@/models/weather';

export const setWeather = async () => {
  const weatherExist = await Weather.findByPk(1);

  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=33.1024539&lon=10.3133067&appid=${process.env.WEATHER_KEY}`
    )
    .then((response) => {
      const weatherData = response.data;

      const dbWeatherFormat = {
        name: weatherData.name,
        weather: weatherData.weather[0].main,
        weatherDescription: weatherData.weather[0].description,
        temp: weatherData.main.temp
      };
      //if weather exist update data
      if (weatherExist) {
        weatherExist.set({
          ...dbWeatherFormat
        });
        return weatherExist.save();
      } else {
        //if weather info does not exist, create new data
        return Weather.create({
          ...dbWeatherFormat
        });
      }
    });
};

export const setWeatherCron = nodeCron.schedule('00 00 */1 * * *', async () => {
  await setWeather();
});
