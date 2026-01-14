import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

export class FindAllNotesDto extends PaginationDto {
    @ApiPropertyOptional({
        description: 'Filter by patient ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsOptional()
    @IsUUID('4', { message: 'Patient ID must be a valid UUID' })
    patientId?: string;
}
