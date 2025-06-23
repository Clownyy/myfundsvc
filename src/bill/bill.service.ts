import { Injectable, Logger } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillService {
  private readonly logger = new Logger(BillService.name)

  constructor(private prisma: PrismaService) { }
  create(createBillDto: CreateBillDto) {
    return this.prisma.bill.create({ data: createBillDto })
  }

  findAll() {
    return this.prisma.bill.findMany({include: {
      template: true
    }});
  }

  findOne(id: number) {
    return this.prisma.bill.findUnique({ where: { id } })
  }

  update(id: number, updateBillDto: UpdateBillDto) {
    return this.prisma.bill.update({ where: { id }, data: updateBillDto })
  }

  remove(id: number) {
    return this.prisma.bill.delete({ where: { id } })
  }
}
