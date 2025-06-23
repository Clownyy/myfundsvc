import { Injectable, Logger } from '@nestjs/common';
import { CreateBillTemplateDto } from './dto/create-bill-template.dto';
import { UpdateBillTemplateDto } from './dto/update-bill-template.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class BillTemplateService {
  private readonly logger = new Logger(BillTemplateService.name)

  constructor(private prisma: PrismaService) { }
  async create(createBillTemplateDto: CreateBillTemplateDto, user: string) {
    let users = await this.prisma.user.findUnique({ where: { login: user } });
    
    if (!createBillTemplateDto.currFreq) createBillTemplateDto.currFreq = 0
    createBillTemplateDto.userId = users.id;
    return this.prisma.billTemplate.create({ data: createBillTemplateDto })
  }

  findAll() {
    return this.prisma.billTemplate.findMany();
  }

  findOne(id: number) {
    return this.prisma.billTemplate.findUnique({ where: { id } })
  }

  update(id: number, updateBillTemplateDto: UpdateBillTemplateDto) {
    return this.prisma.billTemplate.update({ where: { id }, data: updateBillTemplateDto })
  }

  remove(id: number) {
    return this.prisma.billTemplate.delete({ where: { id } })
  }
}
