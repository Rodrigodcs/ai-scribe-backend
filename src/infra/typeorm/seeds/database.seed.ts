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
                name: 'James Wilson',
                dateOfBirth: new Date('1979-05-15'),
                gender: Gender.MALE,
                patientId: 'PAT-001',
                phoneNumber: '+12025551234',
                email: 'james.wilson@example.com',
            },
            {
                name: 'Sarah Johnson',
                dateOfBirth: new Date('1988-08-22'),
                gender: Gender.FEMALE,
                patientId: 'PAT-002',
                phoneNumber: '+12025552345',
                email: 'sarah.johnson@example.com',
            },
            {
                name: 'Michael Brown',
                dateOfBirth: new Date('1992-03-10'),
                gender: Gender.MALE,
                patientId: 'PAT-003',
                phoneNumber: '+12025553456',
                email: 'michael.brown@example.com',
            },
            {
                name: 'Emily Davis',
                dateOfBirth: new Date('1985-11-18'),
                gender: Gender.FEMALE,
                patientId: 'PAT-004',
                phoneNumber: '+12025554567',
                email: 'emily.davis@example.com',
            },
            {
                name: 'David Miller',
                dateOfBirth: new Date('1976-07-25'),
                gender: Gender.MALE,
                patientId: 'PAT-005',
                phoneNumber: '+12025555678',
                email: 'david.miller@example.com',
            },
            {
                name: 'Jessica Martinez',
                dateOfBirth: new Date('1990-02-14'),
                gender: Gender.FEMALE,
                patientId: 'PAT-006',
                phoneNumber: '+12025556789',
                email: 'jessica.martinez@example.com',
            },
            {
                name: 'Christopher Anderson',
                dateOfBirth: new Date('1983-09-30'),
                gender: Gender.MALE,
                patientId: 'PAT-007',
                phoneNumber: '+12025557890',
                email: 'christopher.anderson@example.com',
            },
            {
                name: 'Amanda Taylor',
                dateOfBirth: new Date('1987-12-05'),
                gender: Gender.FEMALE,
                patientId: 'PAT-008',
                phoneNumber: '+12025558901',
                email: 'amanda.taylor@example.com',
            },
            {
                name: 'Daniel Thomas',
                dateOfBirth: new Date('1994-06-20'),
                gender: Gender.MALE,
                patientId: 'PAT-009',
                phoneNumber: '+12025559012',
                email: 'daniel.thomas@example.com',
            },
            {
                name: 'Jennifer White',
                dateOfBirth: new Date('1981-04-12'),
                gender: Gender.FEMALE,
                patientId: 'PAT-010',
                phoneNumber: '+12025550123',
                email: 'jennifer.white@example.com',
            },
            {
                name: 'Matthew Harris',
                dateOfBirth: new Date('1989-10-28'),
                gender: Gender.MALE,
                patientId: 'PAT-011',
                phoneNumber: '+12025551234',
            },
            {
                name: 'Ashley Clark',
                dateOfBirth: new Date('1991-01-08'),
                gender: Gender.FEMALE,
                patientId: 'PAT-012',
                phoneNumber: '+12025552345',
                email: 'ashley.clark@example.com',
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

    // Get all patients
    const allPatients = await patientRepository.find({
        order: { patientId: 'ASC' },
    });

    if (allPatients.length > 0) {
        // First patient gets 7 notes
        const firstPatient = allPatients[0];
        const firstPatientNotesCount = await noteRepository.count({
            where: { patientId: firstPatient.id },
        });

        if (firstPatientNotesCount === 0) {
            const firstPatientNotes = [
                {
                    patientId: firstPatient.id,
                    rawText: 'The pain is localized, worsened with movement, and there are no associated urinary changes or fever. Symptoms began approximately 5 days ago. The patient is a 45-year-old male.',
                    content: 'Subjective: The pain is localized, worsened with movement, and there are no associated urinary changes or fever. Symptoms began approximately 5 days ago. The patient is a 45-year-old male.\nObjective: Vital signs are within normal limits. No neurological deficits observed. Tenderness noted on palpation of the lower lumbar region.\nAssessment: Mechanical low back pain.\nPlan: Advise patient to maintain relative rest, use analgesics, and perform stretching exercises. Follow-up as needed.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: firstPatient.id,
                    rawText: 'Patient reports persistent cough for the past week. No fever or shortness of breath. Denies chest pain.',
                    content: 'Subjective: Patient reports persistent cough for the past week. No fever or shortness of breath. Denies chest pain.\nObjective: Lungs clear to auscultation bilaterally. No wheezing or rales. Heart rate regular.\nAssessment: Post-viral cough, likely resolving.\nPlan: Symptomatic treatment with cough suppressant. Return if symptoms worsen or persist beyond 2 weeks.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: firstPatient.id,
                    transcription: 'Patient complaining of headaches over the past few days. Describes them as pressure-like, worse in the morning. No visual changes or nausea.',
                    content: 'Subjective: Patient complaining of headaches over the past few days. Describes them as pressure-like, worse in the morning. No visual changes or nausea.\nObjective: Blood pressure 128/82. Neurological examination normal. No signs of increased intracranial pressure.\nAssessment: Tension-type headaches, possibly stress-related.\nPlan: Recommend stress management techniques, adequate hydration, and over-the-counter pain relief. Follow-up in 2 weeks if not improved.',
                    audioUrl: 'https://ai-scribe-audios.s3.us-east-1.amazonaws.com/audios/1768445764577-aaasss-1768445764577.mp3',
                    inputType: InputType.AUDIO,
                },
                {
                    patientId: firstPatient.id,
                    rawText: 'Routine annual physical examination. Patient feels well overall.',
                    content: 'Subjective: Patient reports feeling well overall. No new concerns or symptoms.\nObjective: Vital signs stable. Physical examination unremarkable. BMI within normal range.\nAssessment: Healthy adult male, no acute concerns.\nPlan: Continue routine health maintenance. Schedule next annual exam in one year.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: firstPatient.id,
                    transcription: 'Follow-up for low back pain. Patient reports significant improvement with rest and stretching exercises.',
                    content: 'Subjective: Follow-up for low back pain. Patient reports significant improvement with rest and stretching exercises.\nObjective: Range of motion improved. No tenderness on palpation today.\nAssessment: Low back pain resolved with conservative management.\nPlan: Continue stretching routine. Return to normal activities gradually. Follow-up as needed.',
                    audioUrl: 'https://ai-scribe-audios.s3.us-east-1.amazonaws.com/audios/1768445764577-aaasss-1768445764577.mp3',
                    inputType: InputType.AUDIO,
                },
                {
                    patientId: firstPatient.id,
                    rawText: 'Patient requests medication refill for blood pressure medication. Reports good adherence to treatment.',
                    content: 'Subjective: Patient requests medication refill for blood pressure medication. Reports good adherence to treatment.\nObjective: Blood pressure well controlled at 122/78. No side effects reported.\nAssessment: Hypertension well managed with current medication.\nPlan: Prescription refilled for 90-day supply. Continue current regimen. Follow-up in 3 months.',
                    inputType: InputType.TEXT,
                },
                {
                    patientId: firstPatient.id,
                    transcription: 'Patient presents with seasonal allergy symptoms. Sneezing, runny nose, and itchy eyes for the past few days.',
                    content: 'Subjective: Patient presents with seasonal allergy symptoms. Sneezing, runny nose, and itchy eyes for the past few days.\nObjective: Nasal mucosa appears edematous and pale. Conjunctiva mildly injected. No fever.\nAssessment: Seasonal allergic rhinitis.\nPlan: Prescribe antihistamine and nasal corticosteroid spray. Avoid known allergens. Follow-up if symptoms persist.',
                    audioUrl: 'https://ai-scribe-audios.s3.us-east-1.amazonaws.com/audios/1768445764577-aaasss-1768445764577.mp3',
                    inputType: InputType.AUDIO,
                },
            ];

            for (const note of firstPatientNotes) {
                await noteRepository.save(note);
            }
            console.log(`✅ 7 notes created for ${firstPatient.name}!`);
        } else {
            console.log(`⏭️  Notes for ${firstPatient.name} already exist, skipping...`);
        }

        // All other patients get 1 note each
        for (let i = 1; i < allPatients.length; i++) {
            const patient = allPatients[i];
            const patientNotesCount = await noteRepository.count({
                where: { patientId: patient.id },
            });

            if (patientNotesCount === 0) {
                const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
                const genderText = patient.gender === Gender.MALE ? 'male' : patient.gender === Gender.FEMALE ? 'female' : 'other';

                const note = {
                    patientId: patient.id,
                    rawText: `Patient presents for routine visit. The patient is a ${age}-year-old ${genderText}.`,
                    content: `Subjective: Patient presents for routine visit. The patient is a ${age}-year-old ${genderText}.\nObjective: Vital signs within normal limits. Physical examination unremarkable.\nAssessment: Healthy patient, no acute concerns.\nPlan: Continue routine health maintenance. Follow-up as scheduled.`,
                    inputType: InputType.TEXT,
                };

                await noteRepository.save(note);
                console.log(`✅ 1 note created for ${patient.name}!`);
            } else {
                console.log(`⏭️  Notes for ${patient.name} already exist, skipping...`);
            }
        }
    }

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('   - 12 Patients');
    const totalNotes = await noteRepository.count();
    console.log(`   - ${totalNotes} Total Notes`);
}
