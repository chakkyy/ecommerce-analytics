import { SequelizeModuleOptions } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

export const databaseConfig: SequelizeModuleOptions = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  dialect: process.env.DB_DIALECT as Dialect,
  logging: false,
};
