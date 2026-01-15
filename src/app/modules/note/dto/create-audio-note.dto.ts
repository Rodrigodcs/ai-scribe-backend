import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAudioNoteDto {
    @ApiProperty({
        description: 'Patient ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsUUID('4', { message: 'Patient ID must be a valid UUID' })
    @IsNotEmpty({ message: 'Patient ID is required' })
    patientId: string;
}

