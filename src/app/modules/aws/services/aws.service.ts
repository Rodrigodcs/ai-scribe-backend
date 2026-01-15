import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { awsEnvConfig } from 'src/environment';

@Injectable()
export class AwsService {
    private s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client({
            region: awsEnvConfig.REGION,
            credentials: {
                accessKeyId: awsEnvConfig.ACCESS_KEY_ID,
                secretAccessKey: awsEnvConfig.SECRET_ACCESS_KEY,
            },
        });
    }

    getS3Client(): S3Client {
        return this.s3Client;
    }

    getBucketName(): string {
        return awsEnvConfig.S3_BUCKET_NAME;
    }

    getRegion(): string {
        return awsEnvConfig.REGION;
    }
}