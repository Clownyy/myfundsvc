import { Injectable, Logger } from '@nestjs/common';
import { CreateSavingDto } from './dto/create-saving.dto';
import { UpdateSavingDto } from './dto/update-saving.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SavingService {
  private readonly logger = new Logger(SavingService.name);
  constructor(private prisma: PrismaService) { }

  async create(createSavingDto: CreateSavingDto, login: string) {
    const user = await this.prisma.user.findUnique({ where: { login: login } });
    createSavingDto.userId = user.id;
    createSavingDto.date = new Date();
    return this.prisma.saving.create({ data: createSavingDto });
  }

  findAll() {
    return this.prisma.saving.findMany({ include: { instrument: true } });
  }

  findOne(id: number) {
    return this.prisma.saving.findUnique({ where: { id } });
  }

  update(id: number, updateSavingDto: UpdateSavingDto) {
    return this.prisma.saving.update({ where: { id }, data: updateSavingDto });
  }

  remove(id: number) {
    return this.prisma.saving.delete({ where: { id } });
  }
}
