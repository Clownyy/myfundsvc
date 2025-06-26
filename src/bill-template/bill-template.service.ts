/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CreateBillTemplateDto } from './dto/create-bill-template.dto';
import { UpdateBillTemplateDto } from './dto/update-bill-template.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillTemplateService {
	private readonly logger = new Logger(BillTemplateService.name)

	constructor(private prisma: PrismaService) { }
	async create(createBillTemplateDto: CreateBillTemplateDto, user: string) {
		const users = await this.prisma.user.findUnique({ where: { login: user } });

		if (!createBillTemplateDto.currFreq) createBillTemplateDto.currFreq = 0
		createBillTemplateDto.userId = users.id;
		return this.prisma.billTemplate.create({ data: createBillTemplateDto })
	}

	async findAll(user: string) {
		const users = await this.prisma.user.findUnique({ where: { login: user } });
		return this.prisma.billTemplate.findMany({ where: { userId: users.id } });
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

	async getNextInvoice(user: string) {
		const userData = await this.prisma.user.findUnique({ where: { login: user } });
		const result = await this.prisma.billTemplate.aggregate({
			_sum: {
				billAmount: true
			},
			where: {
				active: true,
				userId: userData.id
			}
		})

		return Number(result._sum.billAmount ?? 0);
	}

	async getCurrentInvoice(user: string) {
		const userData = await this.prisma.user.findUnique({ where: { login: user } });
		const billData = await this.prisma.bill.findMany({
			where: {
				paid: false,
				template: {
					userId: userData.id
				}
			},
			include: {
				template: true
			}
		})

		const total = billData.reduce((sum, tx) => {
			return sum + Number(tx.template.billAmount);
		}, 0);

		return total;
	}
}
