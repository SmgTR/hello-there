import { Model, DataTypes } from 'sequelize';

import sequelize from '@/utils/database';

class Weather extends Model {}

Weather.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    weather: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weatherDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    temp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize
  }
);

export default Weather;
