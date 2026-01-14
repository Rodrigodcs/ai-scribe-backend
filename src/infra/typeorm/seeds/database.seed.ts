import { Gender, Patient } from 'src/app/modules/patient/entities/patient.entity';
import { DataSource } from 'typeorm';

export async function runSeed(dataSource: DataSource) {
    console.log('🌱 Starting database seeding...');

    const patientRepository = dataSource.getRepository(Patient);

    console.log('👤 Seeding patients...');
    const patientCount = await patientRepository.count();

    if (patientCount === 0) {
        const patients = [
            {
                name: 'Maria Silva',
                dateOfBirth: new Date('1985-03-15'),
                gender: Gender.FEMALE,
                patientId: 'PAT-001',
                phoneNumber: '+5511999999999',
                email: 'maria.silva@example.com',
            },
            {
                name: 'João Santos',
                dateOfBirth: new Date('1978-07-22'),
                gender: Gender.MALE,
                patientId: 'PAT-002',
                phoneNumber: '+5511888888888',
                email: 'joao.santos@example.com',
            },
            {
                name: 'Ana Costa',
                dateOfBirth: new Date('1992-11-08'),
                gender: Gender.FEMALE,
                patientId: 'PAT-003',
                phoneNumber: '+5511777777777',
                email: 'ana.costa@example.com',
            },
            {
                name: 'Carlos Oliveira',
                dateOfBirth: new Date('1965-05-30'),
                gender: Gender.MALE,
                patientId: 'PAT-004',
                phoneNumber: '+5511666666666',
                email: 'carlos.oliveira@example.com',
            },
            {
                name: 'Fernanda Lima',
                dateOfBirth: new Date('1990-09-12'),
                gender: Gender.FEMALE,
                patientId: 'PAT-005',
                phoneNumber: '+5511555555555',
                email: 'fernanda.lima@example.com',
            },
            {
                name: 'Roberto Alves',
                dateOfBirth: new Date('1988-01-20'),
                gender: Gender.MALE,
                patientId: 'PAT-006',
                phoneNumber: '+5511444444444',
                email: 'roberto.alves@example.com',
            },
            {
                name: 'Juliana Ferreira',
                dateOfBirth: new Date('1995-06-14'),
                gender: Gender.FEMALE,
                patientId: 'PAT-007',
                phoneNumber: '+5511333333333',
                email: 'juliana.ferreira@example.com',
            },
            {
                name: 'Pedro Martins',
                dateOfBirth: new Date('1975-12-03'),
                gender: Gender.MALE,
                patientId: 'PAT-008',
                phoneNumber: '+5511222222222',
            },
            {
                name: 'Camila Souza',
                dateOfBirth: new Date('1993-08-25'),
                gender: Gender.FEMALE,
                patientId: 'PAT-009',
                email: 'camila.souza@example.com',
            },
            {
                name: 'Lucas Ribeiro',
                dateOfBirth: new Date('1987-04-10'),
                gender: Gender.MALE,
                patientId: 'PAT-010',
                phoneNumber: '+5511111111111',
                email: 'lucas.ribeiro@example.com',
            },
            {
                name: 'Patricia Gomes',
                dateOfBirth: new Date('1991-10-18'),
                gender: Gender.FEMALE,
                patientId: 'PAT-011',
                phoneNumber: '+5511000000000',
            },
            {
                name: 'Rafael Barbosa',
                dateOfBirth: new Date('1982-02-28'),
                gender: Gender.MALE,
                patientId: 'PAT-012',
                phoneNumber: '+5511999888777',
                email: 'rafael.barbosa@example.com',
            },
        ];

        for (const patient of patients) {
            await patientRepository.save(patient);
        }
        console.log('✅ 12 patients created!');
    } else {
        console.log('⏭️  Patients already exist, skipping...');
    }

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   - 12 Patients');
}

