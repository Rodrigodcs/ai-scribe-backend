import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { CreateAudioNoteDto } from '../dto/create-audio-note.dto';
import { CreateTextNoteDto } from '../dto/create-text-note.dto';
import { FindAllNotesDto } from '../dto/find-all-notes.dto';
import { UpdateTextNoteDto } from '../dto/update-text-note.dto';
import { Note } from '../entities/note.entity';
import { CreateAudioNoteService } from '../services/create-audio-note.service';
import { CreateTextNoteService } from '../services/create-text-note.service';
import { FindAllNotesService } from '../services/find-all-notes.service';
import { UpdateAudioNoteService } from '../services/update-audio-note.service';
import { UpdateTextNoteService } from '../services/update-text-note.service';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
    constructor(
        private readonly findAllNotesService: FindAllNotesService,
        private readonly createTextNoteService: CreateTextNoteService,
        private readonly updateTextNoteService: UpdateTextNoteService,
        private readonly createAudioNoteService: CreateAudioNoteService,
        private readonly updateAudioNoteService: UpdateAudioNoteService,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'List all notes with optional search, pagination and patient filter',
        description: 'Search notes by content with pagination support and optional patient filter',
    })
    @ApiOkResponse({
        description: 'Paginated notes list returned successfully',
        type: PaginatedResponseDto,
    })
    async findAll(@Query() findAllNotesDto: FindAllNotesDto): Promise<PaginatedResponseDto<Note>> {
        return await this.findAllNotesService.run(findAllNotesDto);
    }

    @Post('text')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new note with text' })
    @ApiCreatedResponse({
        description: 'Note created successfully',
        type: Note,
    })
    async createTextNote(@Body() createNoteDto: CreateTextNoteDto) {
        return await this.createTextNoteService.run(createNoteDto);
    }

    @Patch('text/:id')
    @ApiOperation({ summary: 'Update a note with text' })
    @ApiParam({ name: 'id', description: 'Note ID (UUID)' })
    @ApiOkResponse({
        description: 'Text note updated successfully',
        type: Note,
    })
    async updateTextNote(
        @Param('id') id: string,
        @Body() updateTextNoteDto: UpdateTextNoteDto
    ) {
        return await this.updateTextNoteService.run(id, updateTextNoteDto);
    }

    @Post('audio')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('audio'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Create a new note with audio' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                patientId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Patient ID',
                },
                audio: {
                    type: 'string',
                    format: 'binary',
                    description: 'Audio file to transcribe',
                },
            },
        },
    })
    @ApiCreatedResponse({
        description: 'Note created successfully from audio',
        type: Note,
    })
    async createAudioNote(
        @Body() createAudioNoteDto: CreateAudioNoteDto,
        @UploadedFile() file: { buffer: Buffer; filename: string; mimetype: string } | undefined,
    ) {
        return await this.createAudioNoteService.run(createAudioNoteDto, file);
    }

    @Patch('audio/:id')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('audio'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Update a note with audio' })
    @ApiParam({ name: 'id', description: 'Note ID (UUID)' })
    @ApiOkResponse({
        description: 'Audio note updated successfully',
        type: Note,
    })
    async updateAudioNote(
        @Param('id') id: string,
        @UploadedFile() file: { buffer: Buffer; filename: string; mimetype: string } | undefined,
    ) {
        return await this.updateAudioNoteService.run(id, file);
    }
}
