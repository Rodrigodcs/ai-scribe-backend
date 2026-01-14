import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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

        const where: any = {};

        if (patientId) {
            where.patientId = patientId;
        }

        if (search) {
            where.content = ILike(`%${search.trim()}%`);
        }

        const [data, total] = await this.noteRepository.findAndCount({
            where,
            relations: ['patient'],
            order: { createdAt: 'DESC' },
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
