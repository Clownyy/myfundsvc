import { Test, TestingModule } from '@nestjs/testing';
import { CashPosController } from './cash-pos.controller';
import { CashPosService } from './cash-pos.service';

describe('CashPosController', () => {
  let controller: CashPosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashPosController],
      providers: [CashPosService],
    }).compile();

    controller = module.get<CashPosController>(CashPosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
