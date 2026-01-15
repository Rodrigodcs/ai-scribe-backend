import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Check the health of the application' })
    @ApiOkResponse({
        description: 'Application is healthy',
        type: String,
    })
    async health() {
        console.log(process.env.NODE_ENV);
        console.log(process.env.TYPEORM_CONNECTION);
        console.log(process.env.TYPEORM_HOST);
        console.log(process.env.TYPEORM_USERNAME);
        console.log(process.env.TYPEORM_PASSWORD);
        console.log(process.env.TYPEORM_DATABASE);
        console.log(process.env.TYPEORM_PORT);
        console.log(process.env.OPENAI_API_KEY);
        console.log(process.env.AWS_REGION);
        console.log(process.env.AWS_ACCESS_KEY_ID);
        console.log(process.env.AWS_SECRET_ACCESS_KEY);
        console.log(process.env.AWS_S3_BUCKET_NAME);
        return "OK";
    }
}

