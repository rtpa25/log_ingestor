import { Injectable } from '@nestjs/common';
import { AckPolicy, Consumer } from 'nats';
import { Log } from 'src/ingestor/entities/ingestor.entity';
import { LogRepository } from 'src/ingestor/log.repository';
import { NatsService } from 'src/nats/nats.service';

@Injectable()
export class WorkersService {
    private consumer: Consumer;

    constructor(
        private readonly natsService: NatsService,
        private logRepository: LogRepository,
    ) {}

    async start() {
        const { clientManager, eventClient } = this.natsService.client;

        await clientManager.consumers.add('logs_queue', {
            durable_name: 'worker',
            ack_policy: AckPolicy.Explicit,
        });

        this.consumer = await eventClient.consumers.get('logs_queue', 'worker');

        const messages = await this.consumer.consume();

        for await (const m of messages) {
            const data = JSON.parse(new TextDecoder().decode(m.data)) as Log;

            switch (m.subject) {
                case 'logs.insert': {
                    try {
                        await this.logRepository.save(data);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }

            m.ack();
        }
    }
}
