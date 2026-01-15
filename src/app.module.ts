import { Module } from '@nestjs/common';
import { HealthModule } from './app/modules/health/health.module';
import { NoteModule } from './app/modules/note/note.module';
import { OpenAiModule } from './app/modules/openai/aponai.module';
import { PatientModule } from './app/modules/patient/patient.module';
import { TypeormModule } from './infra/typeorm/typeorm.module';

@Module({
  imports: [
    TypeormModule,
    HealthModule,
    PatientModule,
    NoteModule,
    OpenAiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
