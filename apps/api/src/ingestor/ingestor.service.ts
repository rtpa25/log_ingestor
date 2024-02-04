import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateIngestorDto } from './dto/create-ingestor.dto';
import { Log } from './entities/ingestor.entity';

@Injectable()
export class IngestorService {
    constructor(@InjectRepository(Log) private logRepository: Repository<Log>) {}

    create(createIngestorDto: CreateIngestorDto) {
        try {
            return this.logRepository.save(createIngestorDto);
        } catch (error) {
            throw new Error(error);
        }
    }
}
