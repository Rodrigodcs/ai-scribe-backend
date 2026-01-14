import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Patient } from 'src/app/modules/patient/entities/patient.entity';
import { ormEnvConfig } from '../../environment';

export const getTypeormConfig = (): TypeOrmModuleOptions => {
    console.log(ormEnvConfig);
    return {
        type: 'postgres',
        host: ormEnvConfig.HOST,
        port: ormEnvConfig.PORT ? Number(ormEnvConfig.PORT) : 5432,
        username: ormEnvConfig.USERNAME,
        password: ormEnvConfig.PASSWORD,
        database: ormEnvConfig.DATABASE,
        entities: [Patient],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: false,
        synchronize: false,
        logging: true,
    };
};

