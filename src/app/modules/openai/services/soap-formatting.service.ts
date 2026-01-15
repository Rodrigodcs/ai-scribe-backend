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
                    content: 'You are a medical assistant. Format the given clinical note into SOAP format (Subjective, Objective, Assessment, Plan). Be concise and professional. Maintain the same language as the input text.',
                },
                {
                    role: 'user',
                    content: `Format the following clinical note into SOAP format. Keep the same language as the input:\n\n${text}`,
                },
            ],
            temperature: 0.3,
        });

        return response.choices[0].message.content || text;
    }
}