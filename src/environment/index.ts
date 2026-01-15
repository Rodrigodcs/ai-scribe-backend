import { config } from 'dotenv';

config();

export const ApiConfig = {
    PORT: Number(process.env.PORT) ?? 8080,
}

export const ormEnvConfig = {
    CONNECTION: process.env.TYPEORM_CONNECTION as
        | 'postgres'
        | 'mysql'
        | 'mariadb'
        | 'sqlite'
        | 'oracle'
        | 'mssql',
    HOST: process.env.TYPEORM_HOST,
    USERNAME: process.env.TYPEORM_USERNAME,
    PASSWORD: process.env.TYPEORM_PASSWORD,
    DATABASE: process.env.TYPEORM_DATABASE,
    PORT: process.env.TYPEORM_PORT,
};

export const openaiEnvConfig = {
    API_KEY: process.env.OPENAI_API_KEY ?? '',
};

export const awsEnvConfig = {
    REGION: process.env.AWS_REGION ?? 'us-east-1',
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME ?? '',
};
