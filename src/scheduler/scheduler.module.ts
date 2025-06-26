import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BillModule } from 'src/bill/bill.module';

@Module({
  providers: [SchedulerService],
  imports: [PrismaModule, BillModule],
})
export class SchedulerModule {}
