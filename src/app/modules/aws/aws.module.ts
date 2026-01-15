import { Global, Module } from '@nestjs/common';
import { AwsService } from './services/aws.service';
import { S3DeleteAudioService } from './services/s3-delete-audio.service';
import { S3UploadAudioService } from './services/s3-upload-audio.service';

@Global()
@Module({
    providers: [
        AwsService,
        S3UploadAudioService,
        S3DeleteAudioService,
    ],
    exports: [
        AwsService,
        S3UploadAudioService,
        S3DeleteAudioService,
    ],
})
export class AwsModule { }