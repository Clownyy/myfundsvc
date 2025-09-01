import { Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SavingEntity } from 'src/saving/entities/saving.entity';
import { CashPosEntity } from 'src/cash-pos/entities/cash-po.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class TransactionService {
	private readonly logger = new Logger(TransactionService.name)
	constructor(private prisma: PrismaService) { }

	async create(createTransactionDto: CreateTransactionDto, user: string) {
		return this.prisma.$transaction(async (tx) => {
			const userData: UserEntity = await tx.user.findUnique({ where: { login: user } });
			createTransactionDto.userId = userData.id;
			createTransactionDto.date = new Date();

			const type = createTransactionDto.type;
			if (type == 'SAVING') {
				const saving: SavingEntity = await tx.saving.findUnique({ where: { id: createTransactionDto.savingId } });
				await tx.saving.update({ where: { id: saving.id }, data: { amount: saving.amount.plus(createTransactionDto.amount) } });
			} else if (type == 'EXPENSE') {
				const cashPos: CashPosEntity = await tx.cashPos.findUnique({ where: { userId: createTransactionDto.userId } });
				await tx.cashPos.update({ where: { id: cashPos.id }, data: { amount: cashPos.amount.minus(createTransactionDto.price) } });
			} else if (type == 'INCOME') {
				const cashPos: CashPosEntity = await tx.cashPos.findUnique({ where: { userId: createTransactionDto.userId } });
				await tx.cashPos.update({ where: { id: cashPos.id }, data: { amount: cashPos.amount.plus(createTransactionDto.price) } });
			}
			const { savingId, ...submitTransaction } = createTransactionDto;
			return tx.transaction.create({ data: submitTransaction });
		})

	}

	async findAll(user: string) {
		const userData: UserEntity = await this.prisma.user.findUnique({ where: { login: user } });
		return this.prisma.transaction.findMany({ where: { userId: userData.id }, orderBy: { createdAt: 'desc' } });
	}

	findOne(id: number) {
		return this.prisma.transaction.findUnique({ where: { id } });
	}

	update(id: number, updateTransactionDto: UpdateTransactionDto) {
		return this.prisma.transaction.update({ where: { id }, data: updateTransactionDto });
	}

	remove(id: number) {
		return this.prisma.transaction.delete({ where: { id } });
	}
}
