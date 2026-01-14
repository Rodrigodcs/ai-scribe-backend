import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entity';
import { FindOnePatientService } from './find-one-patient.service';

@Injectable()
export class UpdatePatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        private readonly findOnePatientService: FindOnePatientService,
    ) { }

    async run(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
        const patient = await this.findOnePatientService.run(id);

        if (updatePatientDto.patientId && updatePatientDto.patientId !== patient.patientId) {
            const existingPatient = await this.patientRepository.findOne({
                where: { patientId: updatePatientDto.patientId },
            });

            if (existingPatient) {
                throw new ConflictException(
                    `A patient with ID "${updatePatientDto.patientId}" already exists`,
                );
            }
        }

        if (updatePatientDto.email && updatePatientDto.email !== patient.email) {
            const existingEmail = await this.patientRepository.findOne({
                where: { email: updatePatientDto.email },
            });

            if (existingEmail) {
                throw new ConflictException(
                    `A patient with email "${updatePatientDto.email}" already exists`,
                );
            }
        }

        const updateData: any = { ...updatePatientDto };
        if (updateData.dateOfBirth) {
            updateData.dateOfBirth = new Date(updateData.dateOfBirth);
        }

        Object.assign(patient, updateData);
        return await this.patientRepository.save(patient);
    }
}

