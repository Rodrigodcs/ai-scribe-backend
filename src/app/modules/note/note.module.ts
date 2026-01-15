import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenAiModule } from '../openai/aponai.module';
import { Patient } from '../patient/entities/patient.entity';
import { PatientModule } from '../patient/patient.module';
import { NoteController } from './controllers/note.controller';
import { Note } from './entities/note.entity';
import { CreateTextNoteService } from './services/create-text-note.service';
import { FindAllNotesService } from './services/find-all-notes.service';
import { FindOneNoteService } from './services/find-one-note.service';
import { UpdateTextNoteService } from './services/update-text-note.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Note, Patient]),
        PatientModule,
        OpenAiModule,
    ],
    controllers: [NoteController],
    providers: [
        FindAllNotesService,
        CreateTextNoteService,
        FindOneNoteService,
        UpdateTextNoteService,
    ],
    exports: [],
})
export class NoteModule { }
