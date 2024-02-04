import { OmitType } from '@nestjs/mapped-types';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';

import { Log } from '../entities/ingestor.entity';

export class CreateIngestorDto extends OmitType(Log, ['id']) {
    @IsEnum(['info', 'warning', 'error'])
    level: string;

    @IsNotEmpty()
    message: string;

    @IsDate()
    timestamp: Date;

    @IsNotEmpty()
    commit: string;

    @IsNotEmpty()
    resourceId: string;

    @IsNotEmpty()
    spanId: string;

    @IsNotEmpty()
    traceId: string;
}
