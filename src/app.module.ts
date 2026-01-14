import { Module } from '@nestjs/common';
import { TypeormModule } from './infra/typeorm/typeorm.module';

@Module({
  imports: [
    TypeormModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
