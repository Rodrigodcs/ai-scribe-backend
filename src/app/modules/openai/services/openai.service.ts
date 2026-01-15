import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { openaiEnvConfig } from 'src/environment';

@Injectable()
export class OpenAiService {
    private client: OpenAI;

    constructor() {
        this.client = new OpenAI({
            apiKey: openaiEnvConfig.API_KEY,
        });
    }

    getClient(): OpenAI {
        return this.client;
    }
}