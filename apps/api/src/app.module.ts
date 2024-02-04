import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Log } from './ingestor/entities/ingestor.entity';
import { IngestorModule } from './ingestor/ingestor.module';
import { NatsModule } from './nats/nats.module';
import { WorkersModule } from './workers/workers.module';

@Module({
    imports: [
        IngestorModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.INGESTOR_DB_HOST,
            port: Number(process.env.INGESTOR_DB_PORT),
            username: process.env.INGESTOR_DB_USER_NAME,
            password: process.env.INGESTOR_DB_PASSWORD,
            database: process.env.INGESTOR_DB_NAME,
            entities: [Log],
            schema: 'public',
            synchronize: true, //! Don't use this in production
        }),
        NatsModule,
        WorkersModule,
    ],
})
export class AppModule {}
