import { Injectable } from '@nestjs/common';
import {
    connect,
    ConsumerConfig,
    JetStreamClient,
    JetStreamManager,
    NatsConnection,
    StreamConfig,
} from 'nats';

@Injectable()
export class NatsService {
    private connection: NatsConnection;
    private eventClient: JetStreamClient;
    private clientManager: JetStreamManager;

    get client() {
        return {
            connection: this.connection,
            eventClient: this.eventClient,
            clientManager: this.clientManager,
        };
    }

    async connect() {
        this.connection = await connect({
            servers: ['nats://localhost:4222'],
        });
        console.log('Connected to NATS');
        this.eventClient = this.connection.jetstream();
        console.log('Connected to JetStream');
        this.clientManager = await this.eventClient.jetstreamManager();
        console.log('Connected to JetStream Manager');
    }

    async createStream(cfg: Partial<StreamConfig>) {
        await this.clientManager.streams.add(cfg);
    }

    async createConsumer(streamName: string, cfg: Partial<ConsumerConfig>) {
        await this.clientManager.consumers.add(streamName, cfg);
    }

    async disconnect() {
        await this.connection.close();
    }
}
