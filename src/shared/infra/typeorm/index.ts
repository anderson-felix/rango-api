import 'reflect-metadata';
import 'dotenv/config';
import path from 'path';

import { logger } from '@shared/utils';
import { DataSource, DataSourceOptions } from 'typeorm';

const dbOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT || ''),
  username: process.env.DB_USER || '',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || '',
  entities: [`${path.resolve(__dirname, '..', '..', '..')}/modules/**/infra/typeorm/entities/*{.ts, .js}`],
  migrations: [`${__dirname}/migrations/*{.js, .ts}`],
};

export const AppDataSource = new DataSource(dbOptions);

AppDataSource.initialize()
  .then(() => logger.info(`Database ${dbOptions.database} is running on ${dbOptions.host}:${dbOptions.port}`))
  .catch(error => logger.error(`Fail on initialize database\n${JSON.stringify({ error }, null, 4)}`));
