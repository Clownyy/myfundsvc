import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [InstrumentController],
  providers: [InstrumentService],
  imports: [PrismaModule],
})
export class InstrumentModule {}
