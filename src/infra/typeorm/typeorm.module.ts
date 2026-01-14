import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeormConfig } from './typeorm-config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => getTypeormConfig(),
        }),
    ],
})
export class TypeormModule { }

