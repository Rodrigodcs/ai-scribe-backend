import { Module } from '@nestjs/common';
import { HealthModule } from './app/modules/health/health.module';
import { NoteModule } from './app/modules/note/note.module';
import { OpenAiModule } from './app/modules/openai/aponai.module';
import { PatientModule } from './app/modules/patient/patient.module';
import { TypeormModule } from './infra/typeorm/typeorm.module';
import { AwsModule } from './app/modules/aws/aws.module';

@Module({
  imports: [
    TypeormModule,
    HealthModule,
    PatientModule,
    NoteModule,
    OpenAiModule,
    AwsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
