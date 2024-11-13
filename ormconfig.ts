import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { appSettings } from './src/settings/app-settings';

const migrations = [];

export const postgresConnectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: appSettings.api.POSTGRES_HOST,
  port: appSettings.api.POSTGRES_PORT,
  username: appSettings.api.POSTGRES_USER,
  password: appSettings.api.POSTGRES_PASSWORD,
  database: appSettings.api.POSTGRES_DATABASE,
  entities: [],
  synchronize: true,
  logging: false,
  migrations: migrations,
  migrationsTableName: 'history',
};

export default new DataSource(postgresConnectionOptions);
