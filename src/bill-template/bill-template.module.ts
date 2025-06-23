import { Module } from '@nestjs/common';
import { BillTemplateService } from './bill-template.service';
import { BillTemplateController } from './bill-template.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BillTemplateController],
  providers: [BillTemplateService],
  imports: [PrismaModule]
})
export class BillTemplateModule {}
