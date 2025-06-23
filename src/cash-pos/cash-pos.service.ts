import { Injectable, Logger } from '@nestjs/common';
import { CreateCashPoDto } from './dto/create-cash-po.dto';
import { UpdateCashPoDto } from './dto/update-cash-po.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CashPosService {
  private readonly logger = new Logger(CashPosService.name)
  constructor(private prisma: PrismaService) {}

  create(createCashPoDto: CreateCashPoDto) {
    return this.prisma.cashPos.create({ data: createCashPoDto });
  }
 
  async findAll(user: string) {
    let userData = await this.prisma.user.findFirst({where: { login: user }});
    return this.prisma.cashPos.findFirst({where: { userId: userData.id }});
  }

  findOne(id: number) {
    return this.prisma.cashPos.findUnique({ where: { id } });
  }

  update(id: number, updateCashPoDto: UpdateCashPoDto) {
    return this.prisma.cashPos.update({ where: { id }, data: updateCashPoDto });
  }

  remove(id: number) {
    return this.prisma.cashPos.delete({ where: { id } });
  }
}
