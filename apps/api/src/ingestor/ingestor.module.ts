import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Log } from './entities/ingestor.entity';
import { IngestorController } from './ingestor.controller';
import { IngestorService } from './ingestor.service';

@Module({
    controllers: [IngestorController],
    providers: [IngestorService],
    imports: [TypeOrmModule.forFeature([Log])],
})
export class IngestorModule {}
