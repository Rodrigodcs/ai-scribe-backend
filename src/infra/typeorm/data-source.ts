import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { getTypeormConfig } from './typeorm-config';

config();

const typeormConfig = getTypeormConfig();

export const AppDataSource = new DataSource({
    ...typeormConfig,
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
} as DataSourceOptions);

