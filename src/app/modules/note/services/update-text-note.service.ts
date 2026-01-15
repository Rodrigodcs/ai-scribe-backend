import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3UploadService } from '../../aws/services/s3-upload.service';
import { SoapFormattingService } from '../../openai/services/soap-formatting.service';
import { UpdateTextNoteDto } from '../dto/update-text-note.dto';
import { InputType, Note } from '../entities/note.entity';
import { FindOneNoteService } from './find-one-note.service';

@Injectable()
export class UpdateTextNoteService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
        private readonly findOneNoteService: FindOneNoteService,
        private readonly soapFormattingService: SoapFormattingService,
        private readonly s3UploadService: S3UploadService,
    ) { }

    async run(id: string, updateNoteDto: UpdateTextNoteDto): Promise<Note> {
        const note = await this.findOneNoteService.run(id);

        if (note.inputType === InputType.AUDIO) {
            throw new BadRequestException('Note is already an audio note');
        }

        const content = await this.soapFormattingService.formatToSoap(updateNoteDto.text);

        note.rawText = updateNoteDto.text;
        note.content = content;

        return await this.noteRepository.save(note);
    }
}

