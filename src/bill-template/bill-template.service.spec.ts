import { Test, TestingModule } from '@nestjs/testing';
import { BillTemplateService } from './bill-template.service';

describe('BillTemplateService', () => {
  let service: BillTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BillTemplateService],
    }).compile();

    service = module.get<BillTemplateService>(BillTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
