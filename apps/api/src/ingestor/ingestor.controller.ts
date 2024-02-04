import { Body, Controller, Post } from '@nestjs/common';

import { CreateIngestorDto } from './dto/create-ingestor.dto';
import { IngestorService } from './ingestor.service';

@Controller('ingestor')
export class IngestorController {
    constructor(private readonly ingestorService: IngestorService) {}

    @Post()
    async create(@Body() createIngestorDto: CreateIngestorDto) {
        try {
            const ok = await this.ingestorService.create(createIngestorDto);

            return ok;
        } catch (error) {
            throw new Error(error);
        }
    }
}
