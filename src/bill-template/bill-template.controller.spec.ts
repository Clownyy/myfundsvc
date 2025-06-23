import { Test, TestingModule } from '@nestjs/testing';
import { BillTemplateController } from './bill-template.controller';
import { BillTemplateService } from './bill-template.service';

describe('BillTemplateController', () => {
  let controller: BillTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillTemplateController],
      providers: [BillTemplateService],
    }).compile();

    controller = module.get<BillTemplateController>(BillTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
