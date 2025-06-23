import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BillController],
  providers: [BillService],
  imports: [PrismaModule]
})
export class BillModule {}
