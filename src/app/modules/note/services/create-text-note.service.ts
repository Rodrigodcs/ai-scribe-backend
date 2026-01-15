import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SoapFormattingService } from '../../openai/services/soap-formatting.service';
import { FindOnePatientService } from '../../patient/services/find-one-patient.service';
import { CreateTextNoteDto } from '../dto/create-text-note.dto';
import { InputType, Note } from '../entities/note.entity';

@Injectable()
export class CreateTextNoteService {
    constructor(
        @InjectRepository(Note)
        private readonly noteRepository: Repository<Note>,
        private readonly findOnePatientService: FindOnePatientService,
        private readonly soapFormattingService: SoapFormattingService,
    ) { }

    async run(createTextNoteDto: CreateTextNoteDto): Promise<Note> {
        await this.findOnePatientService.run(createTextNoteDto.patientId);

        const content = await this.soapFormattingService.formatToSoap(createTextNoteDto.text);

        const note = this.noteRepository.create({
            patientId: createTextNoteDto.patientId,
            rawText: createTextNoteDto.text,
            content,
            inputType: InputType.TEXT,
        });

        return await this.noteRepository.save(note);
    }
}

