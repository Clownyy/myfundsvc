import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SchedulerService],
  imports: [PrismaModule],
})
export class SchedulerModule {}
