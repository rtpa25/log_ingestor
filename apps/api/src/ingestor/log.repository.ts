import { Repository } from 'typeorm';

import { Log } from './entities/ingestor.entity';

export class LogRepository extends Repository<Log> {}
