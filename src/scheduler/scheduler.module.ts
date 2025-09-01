import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BillModule } from 'src/bill/bill.module';
import { StockModule } from 'src/stock/stock.module';

@Module({
  providers: [SchedulerService],
  imports: [PrismaModule, BillModule, StockModule],
})
export class SchedulerModule {}
