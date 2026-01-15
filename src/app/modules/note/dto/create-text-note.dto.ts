import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTextNoteDto {
    @ApiProperty({
        description: 'Patient ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID('4', { message: 'Patient ID must be a valid UUID' })
    @IsNotEmpty({ message: 'Patient ID is required' })
    patientId: string;

    @ApiPropertyOptional({
        description: 'Text content',
        example: 'Patient complains of headache and fever',
    })
    @IsString({ message: 'Text must be a string' })
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: 'Text is required' })
    text: string;
}

