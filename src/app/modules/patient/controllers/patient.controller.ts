import {
    Body,
    Controller,
    Delete,
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
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../../shared/dto/paginated-response.dto';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { FindAllPatientsDto } from '../dto/find-all-patients.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient } from '../entities/patient.entity';
import { CreatePatientService } from '../services/create-patient.service';
import { FindAllPatientsService } from '../services/find-all-patients.service';
import { FindOnePatientService } from '../services/find-one-patient.service';
import { RemovePatientService } from '../services/remove-patient.service';
import { UpdatePatientService } from '../services/update-patient.service';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
    constructor(
        private readonly createPatientService: CreatePatientService,
        private readonly findAllPatientsService: FindAllPatientsService,
        private readonly findOnePatientService: FindOnePatientService,
        private readonly updatePatientService: UpdatePatientService,
        private readonly removePatientService: RemovePatientService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new patient' })
    @ApiCreatedResponse({
        description: 'Patient created successfully',
        type: Patient,
    })
    async create(@Body() createPatientDto: CreatePatientDto) {
        return await this.createPatientService.run(createPatientDto);
    }

    @Get()
    @ApiOperation({
        summary: 'List all patients with optional search and pagination',
        description: 'Search patients by name with pagination support',
    })
    @ApiOkResponse({
        description: 'Paginated patients list returned successfully',
        type: PaginatedResponseDto,
    })
    async findAll(@Query() findAllPatientsDto: FindAllPatientsDto): Promise<PaginatedResponseDto<Patient>> {
        return await this.findAllPatientsService.run(findAllPatientsDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a patient by ID' })
    @ApiParam({ name: 'id', description: 'Patient ID (UUID)' })
    @ApiOkResponse({
        description: 'Patient found',
        type: Patient,
    })
    @ApiNotFoundResponse({ description: 'Patient not found' })
    async findOne(@Param('id') id: string) {
        return await this.findOnePatientService.run(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a patient' })
    @ApiParam({ name: 'id', description: 'Patient ID (UUID)' })
    @ApiOkResponse({
        description: 'Patient updated successfully',
        type: Patient,
    })
    @ApiNotFoundResponse({ description: 'Patient not found' })
    async update(
        @Param('id') id: string,
        @Body() updatePatientDto: UpdatePatientDto,
    ) {
        return await this.updatePatientService.run(id, updatePatientDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Remove a patient' })
    @ApiParam({ name: 'id', description: 'Patient ID (UUID)' })
    @ApiNoContentResponse({ description: 'Patient removed successfully' })
    @ApiNotFoundResponse({ description: 'Patient not found' })
    async remove(@Param('id') id: string) {
        await this.removePatientService.run(id);
    }
}

