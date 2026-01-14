import { InputType, Note } from 'src/app/modules/note/entities/note.entity';
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

    const noteRepository = dataSource.getRepository(Note);

    console.log('📝 Seeding notes...');
    const anaCosta = await patientRepository.findOne({
        where: { patientId: 'PAT-003' },
    });
    const carlosOliveira = await patientRepository.findOne({
        where: { patientId: 'PAT-004' },
    });

    if (anaCosta) {
        const anaCostaNotesCount = await noteRepository.count({
            where: { patientId: anaCosta.id },
        });

        if (anaCostaNotesCount === 0) {
            const anaCostaNotes = [
                {
                    patientId: anaCosta.id,
                    rawText: 'Patient reports mild headache and fatigue. No fever. Blood pressure normal.',
                    content: 'Subjective: Patient reports mild headache and fatigue. No fever.\nObjective: Blood pressure normal.\nAssessment: Mild headache, likely stress-related.\nPlan: Rest and hydration. Follow-up if symptoms persist.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: anaCosta.id,
                    rawText: 'Follow-up visit. Headache resolved. Patient feeling better.',
                    content: 'Subjective: Headache resolved. Patient feeling better.\nObjective: Vital signs stable.\nAssessment: Symptoms resolved.\nPlan: Continue current regimen. No further action needed.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: anaCosta.id,
                    transcription: 'Patient came in complaining of stomach pain after eating. Says it started yesterday evening. No nausea or vomiting.',
                    content: 'Subjective: Patient complains of stomach pain after eating. Started yesterday evening. No nausea or vomiting.\nObjective: Abdomen soft, mild tenderness on palpation.\nAssessment: Possible gastritis or indigestion.\nPlan: Dietary modifications, antacid if needed. Follow-up in one week.',
                    audioUrl: 'https://example.com/audio/ana-costa-1.mp3',
                    inputType: InputType.AUDIO,
                },
                {
                    patientId: anaCosta.id,
                    rawText: 'Routine checkup. All vitals normal. Patient in good health.',
                    content: 'Subjective: Patient reports feeling well.\nObjective: All vitals normal. Physical examination unremarkable.\nAssessment: Patient in good health.\nPlan: Continue routine care. Annual checkup scheduled.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: anaCosta.id,
                    rawText: 'Patient requests prescription refill for vitamins. No new concerns.',
                    content: 'Subjective: Patient requests prescription refill for vitamins. No new concerns.\nObjective: Patient appears healthy.\nAssessment: Routine medication refill.\nPlan: Prescription refilled. Continue current vitamin regimen.',
                    inputType: InputType.TEXT,
                },
            ];

            for (const note of anaCostaNotes) {
                await noteRepository.save(note);
            }
            console.log('✅ 5 notes created for Ana Costa!');
        } else {
            console.log('⏭️  Notes for Ana Costa already exist, skipping...');
        }
    }

    if (carlosOliveira) {
        const carlosOliveiraNotesCount = await noteRepository.count({
            where: { patientId: carlosOliveira.id },
        });

        if (carlosOliveiraNotesCount === 0) {
            const carlosOliveiraNotes = [
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Patient presents with chest discomfort. EKG normal. Blood pressure slightly elevated.',
                    content: 'Subjective: Patient reports chest discomfort.\nObjective: EKG normal. Blood pressure 140/90.\nAssessment: Chest discomfort, likely musculoskeletal. Monitor blood pressure.\nPlan: Pain management, blood pressure monitoring. Follow-up in 2 weeks.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Follow-up for blood pressure. Readings improved with medication.',
                    content: 'Subjective: Patient reports feeling better.\nObjective: Blood pressure 130/85.\nAssessment: Blood pressure improved with medication.\nPlan: Continue current medication. Monitor monthly.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    transcription: 'Patient experiencing joint pain in knees, especially in the morning. Difficulty climbing stairs.',
                    content: 'Subjective: Patient reports joint pain in knees, especially in the morning. Difficulty climbing stairs.\nObjective: Joint examination shows mild swelling. Range of motion slightly limited.\nAssessment: Possible osteoarthritis.\nPlan: Physical therapy referral. Pain management. X-ray ordered.',
                    audioUrl: 'https://example.com/audio/carlos-oliveira-1.mp3',
                    inputType: InputType.AUDIO,
                },
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Annual physical examination. Overall health good. Lab results pending.',
                    content: 'Subjective: Patient reports feeling well.\nObjective: Physical examination normal. Vital signs stable.\nAssessment: Overall health good.\nPlan: Lab results pending. Follow-up after results.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Lab results reviewed. Cholesterol slightly elevated. Discussed diet modifications.',
                    content: 'Subjective: Patient understands need for diet changes.\nObjective: Cholesterol 220 mg/dL.\nAssessment: Elevated cholesterol.\nPlan: Dietary modifications, exercise program. Recheck in 3 months.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    transcription: 'Patient reports improved knee pain after physical therapy. Still some stiffness in the morning.',
                    content: 'Subjective: Patient reports improved knee pain after physical therapy. Still some morning stiffness.\nObjective: Range of motion improved. Less swelling noted.\nAssessment: Progress with physical therapy.\nPlan: Continue physical therapy. Consider anti-inflammatory medication.',
                    audioUrl: 'https://example.com/audio/carlos-oliveira-2.mp3',
                    inputType: InputType.AUDIO,
                },
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Medication review. Patient tolerating medications well. No side effects reported.',
                    content: 'Subjective: Patient reports no side effects from medications.\nObjective: Vital signs stable.\nAssessment: Medications well tolerated.\nPlan: Continue current medication regimen. No changes needed.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Routine diabetes check. Blood sugar well controlled. A1C within target range.',
                    content: 'Subjective: Patient reports good adherence to diet and medication.\nObjective: Blood sugar 110 mg/dL. A1C 6.8%.\nAssessment: Diabetes well controlled.\nPlan: Continue current management. Next check in 3 months.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    transcription: 'Patient concerned about recent weight gain. Has been less active due to knee pain.',
                    content: 'Subjective: Patient concerned about recent weight gain. Reports being less active due to knee pain.\nObjective: Weight increased by 3 kg since last visit.\nAssessment: Weight gain related to decreased activity.\nPlan: Discuss low-impact exercise options. Dietary counseling. Monitor weight monthly.',
                    audioUrl: 'https://example.com/audio/carlos-oliveira-3.mp3',
                    inputType: InputType.AUDIO,
                },
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Eye examination for diabetic retinopathy screening. Results normal.',
                    content: 'Subjective: Patient reports no vision changes.\nObjective: Eye examination normal. No signs of retinopathy.\nAssessment: No diabetic retinopathy detected.\nPlan: Continue annual eye examinations. Next screening in one year.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Foot examination for diabetic complications. No ulcers or infections noted.',
                    content: 'Subjective: Patient reports no foot pain or numbness.\nObjective: Foot examination normal. No ulcers or infections.\nAssessment: No diabetic foot complications.\nPlan: Continue foot care education. Annual foot examination.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    transcription: 'Patient asking about flu vaccine. Recommended and administered during visit.',
                    content: 'Subjective: Patient inquiring about flu vaccine.\nObjective: Patient eligible for flu vaccine.\nAssessment: Patient up to date on vaccinations.\nPlan: Flu vaccine administered. Schedule next year.',
                    audioUrl: 'https://example.com/audio/carlos-oliveira-4.mp3',
                    inputType: InputType.AUDIO,
                },
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Medication adjustment for blood pressure. Increased dosage as per protocol.',
                    content: 'Subjective: Patient reports blood pressure readings still slightly elevated at home.\nObjective: Office blood pressure 138/88.\nAssessment: Blood pressure needs adjustment.\nPlan: Increased medication dosage. Recheck in 2 weeks.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    rawText: 'Patient education session on diabetes management and lifestyle modifications.',
                    content: 'Subjective: Patient engaged in education session.\nObjective: Patient demonstrates understanding of diabetes management.\nAssessment: Patient education completed.\nPlan: Continue self-monitoring. Follow-up as scheduled.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: carlosOliveira.id,
                    transcription: 'Follow-up visit. Patient reports feeling much better. Knee pain significantly reduced.',
                    content: 'Subjective: Patient reports feeling much better. Knee pain significantly reduced.\nObjective: Improved mobility. Less joint stiffness.\nAssessment: Significant improvement in knee condition.\nPlan: Continue current treatment. Gradual return to normal activities.',
                    audioUrl: 'https://example.com/audio/carlos-oliveira-5.mp3',
                    inputType: InputType.AUDIO,
                },
            ];

            for (const note of carlosOliveiraNotes) {
                await noteRepository.save(note);
            }
            console.log('✅ 15 notes created for Carlos Oliveira!');
        } else {
            console.log('⏭️  Notes for Carlos Oliveira already exist, skipping...');
        }
    }

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   - 12 Patients');
    if (anaCosta) {
        const anaCostaNotesCount = await noteRepository.count({
            where: { patientId: anaCosta.id },
        });
        console.log(`   - ${anaCostaNotesCount} Notes for Ana Costa`);
    }
    if (carlosOliveira) {
        const carlosOliveiraNotesCount = await noteRepository.count({
            where: { patientId: carlosOliveira.id },
        });
        console.log(`   - ${carlosOliveiraNotesCount} Notes for Carlos Oliveira`);
    }
}

