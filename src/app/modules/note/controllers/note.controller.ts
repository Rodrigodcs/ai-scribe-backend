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
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { CreateTextNoteDto } from '../dto/create-text-note.dto';
import { FindAllNotesDto } from '../dto/find-all-notes.dto';
import { UpdateTextNoteDto } from '../dto/update-text-note.dto';
import { Note } from '../entities/note.entity';
import { CreateTextNoteService } from '../services/create-text-note.service';
import { FindAllNotesService } from '../services/find-all-notes.service';
import { UpdateTextNoteService } from '../services/update-text-note.service';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
    constructor(
        private readonly findAllNotesService: FindAllNotesService,
        private readonly createTextNoteService: CreateTextNoteService,
        private readonly updateTextNoteService: UpdateTextNoteService,
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
}
