import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { AwsService } from './aws.service';

@Injectable()
export class S3UploadService {
    constructor(private readonly awsService: AwsService) { }

    async uploadAudio(
        audioBuffer: Buffer,
        filename: string,
        contentType: string = 'audio/mpeg',
    ): Promise<string> {
        const key = `audios/${Date.now()}-${filename}`;
        const bucketName = this.awsService.getBucketName();
        const region = this.awsService.getRegion();

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: audioBuffer,
            ContentType: contentType,
        });

        await this.awsService.getS3Client().send(command);

        console.log(`https://${bucketName}.s3.${region}.amazonaws.com/${key}`)

        return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    }

    async deleteAudio(audioUrl: string): Promise<void> {
        try {
            const key = this.extractKeyFromUrl(audioUrl);

            console.log(key);
            if (!key) {
                throw new Error('Invalid audio URL format');
            }

            const bucketName = this.awsService.getBucketName();

            const command = new DeleteObjectCommand({
                Bucket: bucketName,
                Key: key,
            });

            await this.awsService.getS3Client().send(command);
        } catch (error) {
            throw new Error(`Failed to delete audio from S3: ${error.message}`);
        }
    }

    private extractKeyFromUrl(url: string): string | null {
        try {
            const match = url.match(/https:\/\/[^/]+\/(.+)$/);
            return match ? match[1] : null;
        } catch {
            return null;
        }
    }
}