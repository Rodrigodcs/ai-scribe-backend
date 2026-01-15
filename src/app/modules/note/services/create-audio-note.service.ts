import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateAudioFilename } from 'src/utils/generate-audio-filename';
import { Repository } from 'typeorm';
import { SoapFormattingService } from '../../openai/services/soap-formatting.service';
import { TranscriptionService } from '../../openai/services/transcription.service';
import { FindOnePatientService } from '../../patient/services/find-one-patient.service';
import { CreateAudioNoteDto } from '../dto/create-audio-note.dto';
import { InputType, Note } from '../entities/note.entity';
import { S3UploadAudioService } from '../../aws/services/s3-upload-audio.service';

@Injectable()
export class CreateAudioNoteService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
        private readonly findOnePatientService: FindOnePatientService,
        private readonly transcriptionService: TranscriptionService,
        private readonly soapFormattingService: SoapFormattingService,
        private readonly s3UploadAudioService: S3UploadAudioService,
    ) { }

    async run(createAudioNoteDto: CreateAudioNoteDto, file: { buffer: Buffer; mimetype: string } | undefined) {
        const patient = await this.findOnePatientService.run(createAudioNoteDto.patientId);

        if (!file || !file.buffer) {
            throw new BadRequestException('Audio file is required');
        }

        const filename = generateAudioFilename(patient.name, file.mimetype);

        const audioUrl = await this.s3UploadAudioService.run(
            file.buffer,
            filename,
            file.mimetype,
        );

        const transcription = await this.transcriptionService.transcribe(file.buffer);

        const content = await this.soapFormattingService.formatToSoap(transcription);

        const note = this.noteRepository.create({
            patientId: createAudioNoteDto.patientId,
            transcription,
            content,
            inputType: InputType.AUDIO,
            audioUrl,
        });

        return await this.noteRepository.save(note);
    }
}

