import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SavingModule } from 'src/saving/saving.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PrismaModule, SavingModule]
})
export class TransactionModule {}
