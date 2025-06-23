import { Module } from '@nestjs/common';
import { SysMenuService } from './sys-menu.service';
import { SysMenuController } from './sys-menu.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SysMenuController],
  providers: [SysMenuService],
  imports: [PrismaModule]
})
export class SysMenuModule {}
