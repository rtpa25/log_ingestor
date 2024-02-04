import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NatsModule } from 'src/nats/nats.module';

import { Log } from './entities/ingestor.entity';
import { IngestorController } from './ingestor.controller';
import { IngestorService } from './ingestor.service';
import { LogRepository } from './log.repository';

@Module({
    controllers: [IngestorController],
    providers: [IngestorService, LogRepository],
    imports: [TypeOrmModule.forFeature([Log]), NatsModule],
    exports: [LogRepository],
})
export class IngestorModule {}
