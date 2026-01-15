import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { OpenAiService } from './openai.service';

@Injectable()
export class TranscriptionService {
    constructor(private readonly openAiService: OpenAiService) { }

    async transcribe(audioBuffer: Buffer): Promise<string> {
        const tempDir = os.tmpdir();
        const tempFilePath = path.join(tempDir, `audio-${Date.now()}.mp3`);

        fs.writeFileSync(tempFilePath, audioBuffer);

        try {
            const fileStream = fs.createReadStream(tempFilePath);
            const transcription = await this.openAiService.getClient().audio.transcriptions.create({
                file: fileStream as any,
                model: 'whisper-1',
            });

            return transcription.text;
        } finally {
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
        }
    }
}