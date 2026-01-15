import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { FindAllNotesDto } from '../dto/find-all-notes.dto';
import { Note } from '../entities/note.entity';

@Injectable()
export class FindAllNotesService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
    ) { }

    async run(findAllNotesDto: FindAllNotesDto): Promise<PaginatedResponseDto<Note>> {
        const { search, page = 1, limit = 10, patientId } = findAllNotesDto;
        const skip = (page - 1) * limit;

        const queryBuilder = this.noteRepository
            .createQueryBuilder('note')
            .leftJoinAndSelect('note.patient', 'patient')
            .orderBy('note.createdAt', 'DESC');

        if (patientId) {
            queryBuilder.where('note.patientId = :patientId', { patientId });
        }

        if (search) {
            const searchTerm = `%${search.trim()}%`;
            if (patientId) {
                queryBuilder.andWhere(
                    '(patient.name ILIKE :search)',
                    { search: searchTerm }
                );
            } else {
                queryBuilder.where(
                    '(patient.name ILIKE :search)',
                    { search: searchTerm }
                );
            }
        }

        console.log(queryBuilder.getQueryAndParameters());
        const [data, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .getManyAndCount();

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
