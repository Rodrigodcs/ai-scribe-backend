import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { FindOnePatientService } from './find-one-patient.service';

@Injectable()
export class RemovePatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        private readonly findOnePatientService: FindOnePatientService,
    ) { }

    async run(id: string): Promise<void> {
        const patient = await this.findOnePatientService.run(id);
        await this.patientRepository.remove(patient);
    }
}

