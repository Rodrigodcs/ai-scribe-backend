import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../patient/entities/patient.entity';
import { NoteController } from './controllers/note.controller';
import { Note } from './entities/note.entity';
import { FindAllNotesService } from './services/find-all-notes.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Note, Patient]),
    ],
    controllers: [NoteController],
    providers: [
        FindAllNotesService,
    ],
    exports: [],
})
export class NoteModule { }
