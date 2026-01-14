import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
    @ApiProperty({ description: 'Current page', example: 1 })
    page: number;

    @ApiProperty({ description: 'Items per page', example: 10 })
    limit: number;

    @ApiProperty({ description: 'Total items', example: 100 })
    total: number;

    @ApiProperty({ description: 'Total pages', example: 10 })
    totalPages: number;

    @ApiProperty({ description: 'Has previous page', example: false })
    hasPreviousPage: boolean;

    @ApiProperty({ description: 'Has next page', example: true })
    hasNextPage: boolean;
}

export class PaginatedResponseDto<T> {
    @ApiProperty({ description: 'Items list' })
    data: T[];

    @ApiProperty({ description: 'Pagination metadata', type: PaginationMeta })
    meta: PaginationMeta;
}

