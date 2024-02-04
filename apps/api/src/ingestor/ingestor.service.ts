import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NatsService } from 'src/nats/nats.service';
import { Repository } from 'typeorm';

import { CreateIngestorDto } from './dto/create-ingestor.dto';
import { Log } from './entities/ingestor.entity';

@Injectable()
export class IngestorService {
    constructor(
        @InjectRepository(Log) private logRepository: Repository<Log>,
        private eventBus: NatsService,
    ) {}

    async create(createIngestorDto: CreateIngestorDto): Promise<boolean> {
        try {
            const log = this.logRepository.create(createIngestorDto);
            await this.eventBus.client.eventClient.publish('logs.insert', JSON.stringify(log));

            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}
