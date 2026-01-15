import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { FindAllNotesDto } from '../dto/find-all-notes.dto';
import { Note } from '../entities/note.entity';
import { FindAllNotesService } from '../services/find-all-notes.service';
import { CreateNoteDto } from '../dto/create-note.dto';

@ApiTags('notes')
@Controller('notes')
export class NoteController {
    constructor(
        private readonly findAllNotesService: FindAllNotesService,
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

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new note with text' })
    @ApiCreatedResponse({
        description: 'Note created successfully',
        type: Note,
    })
    async create(@Body() createNoteDto: CreateNoteDto) {
        return
    }
}
