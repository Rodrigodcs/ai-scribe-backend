import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateNotesTable1768422740682 implements MigrationInterface {
    name = 'CreateNotesTable1768422740682';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "notes_input_type_enum" AS ENUM ('TEXT', 'AUDIO');
        `);

        await queryRunner.createTable(
            new Table({
                name: 'notes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'patient_id',
                        type: 'uuid',
                    },
                    {
                        name: 'raw_text',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'transcription',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'audio_url',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'content',
                        type: 'text',
                    },
                    {
                        name: 'input_type',
                        type: 'notes_input_type_enum',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: 'now()',
                    },
                ],
            }),
            true,
        );

        await queryRunner.query(`
            ALTER TABLE "notes"
            ALTER COLUMN "input_type" SET DEFAULT 'TEXT'::notes_input_type_enum;
        `);

        await queryRunner.createForeignKey(
            'notes',
            new TableForeignKey({
                columnNames: ['patient_id'],
                referencedTableName: 'patients',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const notesTable = await queryRunner.getTable('notes');
        if (notesTable) {
            const foreignKeys = notesTable.foreignKeys;
            for (const foreignKey of foreignKeys) {
                await queryRunner.dropForeignKey('notes', foreignKey);
            }
        }

        await queryRunner.dropTable('notes', true);
        await queryRunner.query(`DROP TYPE IF EXISTS "notes_input_type_enum"`);
    }
}
