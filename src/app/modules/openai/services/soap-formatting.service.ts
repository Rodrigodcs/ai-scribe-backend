import { Injectable } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Injectable()
export class SoapFormattingService {
    constructor(private readonly openAiService: OpenAiService) { }

    async formatToSoap(text: string): Promise<string> {
        const response = await this.openAiService.getClient().chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: this.getCommand(),
                },
                {
                    role: 'user',
                    content: `Format the following clinical note into SOAP format using the exact format specified. Keep the same language as the input:\n\n${text}`,
                },
            ],
            temperature: 0.3,
        });

        const rawContent = response.choices[0].message.content || text;

        return this.normalizeSoapFormat(rawContent);
    }

    private normalizeSoapFormat(content: string): string {
        let normalized = content.trim();

        const lines = normalized.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        const sections: { [key: string]: string } = {
            'Subjective': '',
            'Objective': '',
            'Assessment': '',
            'Plan': '',
        };

        for (const line of lines) {
            for (const sectionName of Object.keys(sections)) {
                if (line.startsWith(sectionName + ':') || line.startsWith(sectionName.toLowerCase() + ':')) {
                    const content = line.substring(line.indexOf(':') + 1).trim();
                    sections[sectionName] = content || 'Not specified';
                    break;
                }
            }
        }

        if (Object.values(sections).some(v => v !== '')) {
            return Object.entries(sections)
                .map(([key, value]) => `${key}: ${value || 'Not specified'}`)
                .join('\n');
        }

        const formatted = lines
            .map(line => {
                if (line.match(/^(Subjective|Objective|Assessment|Plan):/i)) {
                    return line;
                }
                return null;
            })
            .filter(line => line !== null)
            .join('\n');

        if (formatted && formatted.split('\n').length >= 2) {
            return formatted;
        }

        return this.parseAndReformat(content);
    }

    private parseAndReformat(content: string): string {
        const subjectiveMatch = content.match(/(?:Subjective|S):\s*(.+?)(?=\n(?:Objective|O):|$)/is);
        const objectiveMatch = content.match(/(?:Objective|O):\s*(.+?)(?=\n(?:Assessment|A):|$)/is);
        const assessmentMatch = content.match(/(?:Assessment|A):\s*(.+?)(?=\n(?:Plan|P):|$)/is);
        const planMatch = content.match(/(?:Plan|P):\s*(.+?)$/is);

        const subjective = subjectiveMatch ? subjectiveMatch[1].trim().replace(/\n/g, ' ') : 'Not specified';
        const objective = objectiveMatch ? objectiveMatch[1].trim().replace(/\n/g, ' ') : 'Not specified';
        const assessment = assessmentMatch ? assessmentMatch[1].trim().replace(/\n/g, ' ') : 'Not specified';
        const plan = planMatch ? planMatch[1].trim().replace(/\n/g, ' ') : 'Not specified';

        return `Subjective: ${subjective}\nObjective: ${objective}\nAssessment: ${assessment}\nPlan: ${plan}`;
    }

    private getCommand(): string {
        return `You are a medical assistant. Format the given clinical note into SOAP format (Subjective, Objective, Assessment, Plan). 
IMPORTANT: You MUST always return the response in the following exact format (one line per section, starting with the section name followed by a colon):

Subjective: [patient's symptoms, complaints, and history]
Objective: [observable findings, vital signs, test results]
Assessment: [diagnosis or clinical impression]
Plan: [treatment plan, medications, follow-up]

Rules:
- Each section must be on a single line
- Start each line with the section name followed by a colon and a space
- Be concise and professional
- Maintain the same language as the input text
- If information is missing for a section, write "Not specified" for that section
- Never use bullet points, numbered lists, or line breaks within sections`
    }
}