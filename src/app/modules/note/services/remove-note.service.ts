import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { FindOneNoteService } from './find-one-note.service';
import { S3DeleteAudioService } from '../../aws/services/s3-delete-audio.service';

@Injectable()
export class RemoveNoteService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
        private readonly findOneNoteService: FindOneNoteService,
        private readonly s3DeleteAudioService: S3DeleteAudioService,
    ) { }

    async run(id: string): Promise<void> {
        const note = await this.findOneNoteService.run(id);
        if (note.audioUrl) {
            await this.s3DeleteAudioService.run(note.audioUrl);
        }
        await this.noteRepository.remove(note);
    }
}

