import { Global, Module } from '@nestjs/common';
import { OpenAiService } from './services/openai.service';
import { SoapFormattingService } from './services/soap-formatting.service';
import { TranscriptionService } from './services/transcription.service';

@Global()
@Module({
    providers: [
        OpenAiService,
        TranscriptionService,
        SoapFormattingService,
    ],
    exports: [
        TranscriptionService,
        SoapFormattingService,
    ],
})
export class OpenAiModule { }