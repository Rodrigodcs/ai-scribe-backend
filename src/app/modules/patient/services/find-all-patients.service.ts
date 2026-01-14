import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { FindAllPatientsDto } from '../dto/find-all-patients.dto';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class FindAllPatientsService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
    ) { }

    async run(findAllPatientsDto: FindAllPatientsDto): Promise<PaginatedResponseDto<Patient>> {
        const { search, page = 1, limit = 10 } = findAllPatientsDto;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.name = ILike(`%${search.trim()}%`);
        }

        const [data, total] = await this.patientRepository.findAndCount({
            where,
            order: { name: 'ASC' },
            skip,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasPreviousPage: page > 1,
                hasNextPage: page < totalPages,
            },
        };
    }
}

