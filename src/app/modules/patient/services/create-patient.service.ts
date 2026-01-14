import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { Gender, Patient } from '../entities/patient.entity';

@Injectable()
export class CreatePatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
    ) { }

    async run(createPatientDto: CreatePatientDto): Promise<Patient> {
        const existingPatient = await this.patientRepository.findOne({
            where: { patientId: createPatientDto.patientId },
        });

        if (existingPatient) {
            throw new ConflictException(
                `A patient with ID "${createPatientDto.patientId}" already exists`,
            );
        }

        if (createPatientDto.email) {
            const existingEmail = await this.patientRepository.findOne({
                where: { email: createPatientDto.email },
            });

            if (existingEmail) {
                throw new ConflictException(
                    `A patient with email "${createPatientDto.email}" already exists`,
                );
            }
        }

        const patient = this.patientRepository.create({
            ...createPatientDto,
            dateOfBirth: new Date(createPatientDto.dateOfBirth),
            gender: createPatientDto.gender || Gender.OTHER,
        });
        return await this.patientRepository.save(patient);
    }
}

