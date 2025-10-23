import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SavingEntity } from 'src/saving/entities/saving.entity';
import { CashPosEntity } from 'src/cash-pos/entities/cash-po.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SavingService } from 'src/saving/saving.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class TransactionService {
    private readonly logger = new Logger(TransactionService.name);
    constructor(
        private prisma: PrismaService,
        private readonly savingService: SavingService,
    ) {}

    async create(createTransactionDto: CreateTransactionDto, user: string) {
        return this.prisma.$transaction(async (tx) => {
            const userData: UserEntity = await tx.user.findUnique({
                where: { login: user },
            });
            createTransactionDto.userId = userData.id;
            createTransactionDto.date = new Date();

            const type = createTransactionDto.type;
            if (type == 'SAVING') {
                const saving: SavingEntity = await tx.saving.findUnique({
                    where: { instrumentId: createTransactionDto.instrumentId },
                });
                this.logger.log(
                    'Request received ' + JSON.stringify(createTransactionDto),
                );
                if (!saving) {
                    await tx.saving.create({
                        data: {
                            savingName:
                                'Saving ' + createTransactionDto.instrumentId,
                            amount: createTransactionDto.amount,
                            date: new Date(),
                            instrumentId: createTransactionDto.instrumentId,
                            userId: userData.id,
                            avgPrice: createTransactionDto.price,
                            totalCost: new Decimal(
                                createTransactionDto.amount,
                            ).mul(new Decimal(createTransactionDto.price)),
                        },
                    });
                } else {
                    await tx.saving.update({
                        where: { id: saving.id },
                        data: {
                            amount: saving.amount.plus(
                                createTransactionDto.amount,
                            ),
                            totalCost: saving.totalCost.plus(
                                new Decimal(createTransactionDto.amount).mul(
                                    createTransactionDto.price,
                                ),
                            ),
                        },
                    });
                }
            } else if (type == 'EXPENSE') {
                const cashPos: CashPosEntity = await tx.cashPos.findUnique({
                    where: { userId: createTransactionDto.userId },
                });
                await tx.cashPos.update({
                    where: { id: cashPos.id },
                    data: {
                        amount: cashPos.amount.minus(
                            createTransactionDto.price,
                        ),
                    },
                });
            } else if (type == 'INCOME') {
                const cashPos: CashPosEntity = await tx.cashPos.findUnique({
                    where: { userId: createTransactionDto.userId },
                });
                await tx.cashPos.update({
                    where: { id: cashPos.id },
                    data: {
                        amount: cashPos.amount.plus(createTransactionDto.price),
                    },
                });
            } else if (type == 'SAVINGOUT') {
                const saving: SavingEntity = await tx.saving.findUnique({
                    where: { instrumentId: createTransactionDto.instrumentId },
                });
                if (!saving) {
                    throw new NotFoundException(
                        'You doesnt have this portfolio',
                    );
                }
                if (saving.amount.lessThan(createTransactionDto.amount)) {
                    throw new BadRequestException('Insufficient funds');
                }
                if (saving.amount.equals(createTransactionDto.amount)) {
                    await tx.saving.delete({
                        where: { id: saving.id },
                    });
                } else {
                    await tx.saving.update({
                        where: { id: saving.id },
                        data: {
                            amount: saving.amount.minus(
                                createTransactionDto.amount,
                            ),
                            totalCost: saving.totalCost.minus(
                                new Decimal(createTransactionDto.amount).mul(
                                    createTransactionDto.price,
                                ),
                            ),
                        },
                    });
                }
            }
            const { instrumentId, ...submitTransaction } = createTransactionDto;
            return tx.transaction.create({ data: submitTransaction });
        });
    }

    async findAll(user: string) {
        const userData: UserEntity = await this.prisma.user.findUnique({
            where: { login: user },
        });
        return this.prisma.transaction.findMany({
            where: { userId: userData.id },
            orderBy: { createdAt: 'desc' },
        });
    }

    findOne(id: number) {
        return this.prisma.transaction.findUnique({ where: { id } });
    }

    update(id: number, updateTransactionDto: UpdateTransactionDto) {
        return this.prisma.transaction.update({
            where: { id },
            data: updateTransactionDto,
        });
    }

    remove(id: number) {
        return this.prisma.transaction.delete({ where: { id } });
    }

    async getSavingTransaction(user: string) {
        const userData = await this.prisma.user.findUnique({
            where: { login: user },
        });
        const savingData = await this.prisma.saving.findMany({
            where: {
                userId: userData.id,
            },
        });

        const totalSaving = savingData.reduce((sum, tx) => {
            return sum + Number(tx.totalCost);
        }, 0);

        return totalSaving;
    }

    async getProfitLoss(user: string) {
        const transactionTotal = await this.getSavingTransaction(user);
        const assetTotal = await this.savingService.getAsset(user);
        const profitLoss = assetTotal.minus(transactionTotal);
        return profitLoss.div(transactionTotal).mul(100);
    }
}
