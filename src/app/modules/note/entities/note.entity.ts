import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';

export enum InputType {
    TEXT = 'TEXT',
    AUDIO = 'AUDIO',
}

@Entity('notes')
export class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'uuid', name: 'patient_id' })
    patientId: string;

    @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @Column({ type: 'text', nullable: true, name: 'raw_text' })
    rawText?: string;

    @Column({ type: 'text', nullable: true, name: 'transcription' })
    transcription?: string;

    @Column({ type: 'text', nullable: true, name: 'audio_url' })
    audioUrl?: string;

    @Column({ type: 'text', name: 'content' })
    content: string;

    @Column({
        type: 'enum',
        enum: InputType,
        enumName: 'notes_input_type_enum',
        default: InputType.TEXT,
        name: 'input_type',
    })
    inputType: InputType;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt?: Date;
}

