import { Global, Module } from '@nestjs/common';
import { AwsService } from './services/aws.service';
import { S3UploadService } from './services/s3-upload.service';

@Global()
@Module({
    providers: [
        AwsService,
        S3UploadService,
    ],
    exports: [
        AwsService,
        S3UploadService,
    ],
})
export class AwsModule { }