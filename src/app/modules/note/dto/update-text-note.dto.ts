import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTextNoteDto {
    @ApiPropertyOptional({
        description: 'Text content',
        example: 'Patient complains of headache and fever',
    })
    @IsString({ message: 'Text must be a string' })
    @Transform(({ value }) => value?.trim())
    @IsNotEmpty({ message: 'Text is required' })
    text: string;
}

