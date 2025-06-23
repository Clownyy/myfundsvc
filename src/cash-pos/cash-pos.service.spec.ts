import { Test, TestingModule } from '@nestjs/testing';
import { CashPosService } from './cash-pos.service';

describe('CashPosService', () => {
  let service: CashPosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashPosService],
    }).compile();

    service = module.get<CashPosService>(CashPosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
