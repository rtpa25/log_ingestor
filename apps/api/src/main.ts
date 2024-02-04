import { NestFactory } from '@nestjs/core';
import { RetentionPolicy } from 'nats';

import { AppModule } from './app.module';
import { NatsService } from './nats/nats.service';
import { WorkersService } from './workers/workers.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const natsService = app.get(NatsService);
    await natsService.connect();

    await natsService.createStream({
        name: 'logs_queue',
        subjects: ['logs.>'],
        retention: RetentionPolicy.Workqueue,
        max_bytes: 1024 * 1024,
    });

    const workerService = app.get(WorkersService);
    await workerService.start();

    await app.listen(8080);

    async function shutdown() {
        await natsService.disconnect();
        process.exit(0);
    }

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}
bootstrap();
