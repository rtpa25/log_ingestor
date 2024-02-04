import { Test, TestingModule } from '@nestjs/testing';

import { IngestorController } from './ingestor.controller';
import { IngestorService } from './ingestor.service';

describe('IngestorController', () => {
    let controller: IngestorController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [IngestorController],
            providers: [IngestorService],
        }).compile();

        controller = module.get<IngestorController>(IngestorController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
