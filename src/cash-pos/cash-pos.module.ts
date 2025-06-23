import { Module } from '@nestjs/common';
import { CashPosService } from './cash-pos.service';
import { CashPosController } from './cash-pos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CashPosController],
  providers: [CashPosService],
  imports: [PrismaModule]
})
export class CashPosModule {}
