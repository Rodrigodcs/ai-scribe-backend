import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from './controllers/patient.controller';
import { Patient } from './entities/patient.entity';
import { CreatePatientService } from './services/create-patient.service';
import { FindAllPatientsService } from './services/find-all-patients.service';
import { FindOnePatientService } from './services/find-one-patient.service';
import { RemovePatientService } from './services/remove-patient.service';
import { UpdatePatientService } from './services/update-patient.service';

@Module({
    imports: [TypeOrmModule.forFeature([Patient])],
    controllers: [PatientController],
    providers: [
        CreatePatientService,
        FindAllPatientsService,
        FindOnePatientService,
        UpdatePatientService,
        RemovePatientService,
    ],
    exports: [],
})
export class PatientModule { }

