import { Module } from '@nestjs/common';
import { SavingService } from './saving.service';
import { SavingController } from './saving.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SavingController],
  providers: [SavingService],
  imports: [PrismaModule]
})
export class SavingModule {}
