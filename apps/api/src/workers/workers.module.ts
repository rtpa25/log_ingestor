import { Module } from '@nestjs/common';
import { IngestorModule } from 'src/ingestor/ingestor.module';
import { NatsModule } from 'src/nats/nats.module';

import { WorkersService } from './workers.service';

@Module({
    providers: [WorkersService],
    imports: [NatsModule, IngestorModule],
})
export class WorkersModule {}
