import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { AwsService } from './aws.service';

@Injectable()
export class S3UploadAudioService {
    constructor(private readonly awsService: AwsService) { }

    async run(
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

        return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    }
}