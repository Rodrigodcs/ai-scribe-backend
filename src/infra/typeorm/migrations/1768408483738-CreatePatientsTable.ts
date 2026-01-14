import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePatientsTable1768408483738 implements MigrationInterface {
    name = 'CreatePatientsTable1768408483738';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);

        await queryRunner.query(`
            CREATE TYPE "patients_gender_enum" AS ENUM ('male', 'female', 'other');
        `);

        await queryRunner.createTable(
            new Table({
                name: 'patients',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                    },
                    {
                        name: 'date_of_birth',
                        type: 'date',
                    },
                    {
                        name: 'gender',
                        type: 'patients_gender_enum',
                    },
                    {
                        name: 'patient_id',
                        type: 'varchar',
                        length: '100',
                        isUnique: true,
                    },
                    {
                        name: 'phone_number',
                        type: 'varchar',
                        length: '15',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
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
            ALTER TABLE "patients" 
            ALTER COLUMN "gender" SET DEFAULT 'other'::patients_gender_enum;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('patients', true);
        await queryRunner.query(`DROP TYPE IF EXISTS "patients_gender_enum"`);
    }

}
