import { Test, TestingModule } from '@nestjs/testing';
import { SysMenuController } from './sys-menu.controller';
import { SysMenuService } from './sys-menu.service';

describe('SysMenuController', () => {
  let controller: SysMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SysMenuController],
      providers: [SysMenuService],
    }).compile();

    controller = module.get<SysMenuController>(SysMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
