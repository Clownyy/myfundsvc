import { Injectable, Logger } from '@nestjs/common';
import { CreateSavingDto } from './dto/create-saving.dto';
import { UpdateSavingDto } from './dto/update-saving.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

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

	async findAll(user: string) {
		const userData = await this.prisma.user.findUnique({ where: { login: user } });
		return this.prisma.saving.findMany({ include: { instrument: true }, where: { userId: userData.id } });
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

	async getAsset(user: string) {
		const userData = await this.prisma.user.findUnique({ where: { login: user } });
		const cashPos = await this.prisma.cashPos.findUnique({ where: { userId: userData.id } });
		const saving = await this.prisma.saving.findMany({ where: { userId: userData.id }, select: { amount: true, instrument: { select: { sellPrice: true } } } });
		const savingAmount = saving.reduce((sum: Decimal, item) => {
			return sum.plus(item.amount.mul(item.instrument.sellPrice));
		}, new Decimal(0));


		return cashPos.amount.plus(savingAmount);
	}
}
