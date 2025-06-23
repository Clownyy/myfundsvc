import { Injectable, Logger } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InstrumentService {
  private readonly logger = new Logger(InstrumentService.name);
  constructor(private prisma: PrismaService) {}
  
  create(createInstrumentDto: CreateInstrumentDto) {
    return this.prisma.instrument.create({ data: createInstrumentDto });
  }

  findAll() {
    return this.prisma.instrument.findMany();
  }

  findOne(id: number) {
    return this.prisma.instrument.findUnique({ where: { id } });
  }

  update(id: number, updateInstrumentDto: UpdateInstrumentDto) {
    return this.prisma.instrument.update({ where: { id }, data: updateInstrumentDto });
  }

  remove(id: number) {
    return this.prisma.instrument.delete({ where: { id } });
  }
}
