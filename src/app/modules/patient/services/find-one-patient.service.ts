import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class FindOnePatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
    ) { }

    async run(id: string): Promise<Patient> {
        const patient = await this.patientRepository.findOne({
            where: { id },
        });

        if (!patient) {
            throw new NotFoundException(`Patient with ID ${id} not found`);
        }

        return patient;
    }
}

