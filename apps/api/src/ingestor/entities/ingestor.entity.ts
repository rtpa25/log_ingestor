import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: string;

    @Column()
    message: string;

    @Column()
    timestamp: Date;

    @Column()
    resourceId: string;

    @Column()
    traceId: string;

    @Column()
    spanId: string;

    @Column()
    commit: string;

    @Column('json', { nullable: true })
    metadata: {
        parentResourceId: string;
    };
}
