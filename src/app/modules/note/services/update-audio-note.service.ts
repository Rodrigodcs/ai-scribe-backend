import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateAudioFilename } from 'src/utils/generate-audio-filename';
import { Repository } from 'typeorm';
import { S3UploadService } from '../../aws/services/s3-upload.service';
import { SoapFormattingService } from '../../openai/services/soap-formatting.service';
import { TranscriptionService } from '../../openai/services/transcription.service';
import { InputType, Note } from '../entities/note.entity';
import { FindOneNoteService } from './find-one-note.service';

@Injectable()
export class UpdateAudioNoteService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
        private readonly findOneNoteService: FindOneNoteService,
        private readonly transcriptionService: TranscriptionService,
        private readonly soapFormattingService: SoapFormattingService,
        private readonly s3UploadService: S3UploadService,
    ) { }

    async run(id: string, file: { buffer: Buffer; mimetype: string } | undefined) {
        const note = await this.findOneNoteService.run(id);

        if (note.inputType === InputType.TEXT) {
            throw new BadRequestException('Note is already a text note');
        }

        if (!file || !file.buffer) {
            throw new BadRequestException('Audio file is required');
        }

        const filename = generateAudioFilename(note.patient.name, file.mimetype);

        const audioUrl = await this.s3UploadService.uploadAudio(
            file.buffer,
            filename,
            file.mimetype,
        );

        if (note.audioUrl) {
            await this.s3UploadService.deleteAudio(note.audioUrl);
        }

        const transcription = await this.transcriptionService.transcribe(file.buffer);

        const content = await this.soapFormattingService.formatToSoap(transcription);

        note.transcription = transcription;
        note.content = content;
        note.audioUrl = audioUrl;

        return await this.noteRepository.save(note);
    }
}

