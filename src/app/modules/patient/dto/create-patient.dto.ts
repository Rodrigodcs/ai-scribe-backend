import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Gender } from '../entities/patient.entity';

export class CreatePatientDto {
    @ApiProperty({
        description: 'Patient name',
        example: 'John Doe',
        maxLength: 255,
    })
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    @MaxLength(255, { message: 'Name must have at most 255 characters' })
    @Transform(({ value }) => value?.trim())
    name: string;

    @ApiProperty({
        description: 'Patient date of birth (ISO format: YYYY-MM-DD or DD/MM/YYYY)',
        example: '1987-11-20',
    })
    @IsDateString({}, { message: 'Date of birth must be a valid date in format YYYY-MM-DD or DD/MM/YYYY' })
    @IsNotEmpty({ message: 'Date of birth is required' })
    @Transform(({ value }) => {
        if (!value) return value;
        const str = value.trim();
        if (str.includes('/')) {
            const [day, month, year] = str.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }
        return str;
    })
    dateOfBirth: string;

    @ApiPropertyOptional({
        description: 'Patient gender',
        example: 'male',
        enum: Gender,
        default: 'other',
    })
    @IsOptional()
    @IsEnum(Gender, { message: 'Gender must be one of: male, female, other' })
    gender?: Gender;

    @ApiProperty({
        description: 'Patient ID (unique identifier)',
        example: 'PAT-001',
        maxLength: 100,
    })
    @IsString({ message: 'Patient ID must be a string' })
    @IsNotEmpty({ message: 'Patient ID is required' })
    @MaxLength(100, { message: 'Patient ID must have at most 100 characters' })
    @Transform(({ value }) => value?.trim())
    patientId: string;

    @ApiPropertyOptional({
        description: 'Patient phone number',
        example: '+5511999999999',
        maxLength: 15,
    })
    @IsOptional()
    @IsString({ message: 'Phone number must be a string' })
    @MaxLength(15, { message: 'Phone number must have at most 15 characters' })
    @Transform(({ value }) => value?.trim())
    phoneNumber?: string;

    @ApiPropertyOptional({
        description: 'Patient email',
        example: 'john.doe@example.com',
        maxLength: 255,
    })
    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @MaxLength(255, { message: 'Email must have at most 255 characters' })
    @Transform(({ value }) => value?.trim().toLowerCase())
    email?: string;
}

