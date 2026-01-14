import { Module } from '@nestjs/common';
import { HealthModule } from './app/modules/health/health.module';
import { NoteModule } from './app/modules/note/note.module';
import { PatientModule } from './app/modules/patient/patient.module';
import { TypeormModule } from './infra/typeorm/typeorm.module';

@Module({
  imports: [
    TypeormModule,
    HealthModule,
    PatientModule,
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
