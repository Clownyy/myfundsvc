/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';
import { CashPosEntity } from 'src/cash-pos/entities/cash-po.entity';
import { Decimal } from '@prisma/client/runtime/library';
import { getCurrentMonth } from 'src/utils/utils';

@Injectable()
export class BillService {
    private readonly logger = new Logger(BillService.name);

    constructor(private prisma: PrismaService) {}
    create(createBillDto: CreateBillDto) {
        return this.prisma.bill.create({ data: createBillDto });
    }

    async findAll(user: string) {
        const userData = await this.prisma.user.findUnique({
            where: { login: user },
        });
        return this.prisma.bill.findMany({
            where: {
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                template: {
                    userId: userData.id,
                },
            },
            include: {
                template: true,
            },
        });
    }

    findOne(id: number) {
        return this.prisma.bill.findUnique({ where: { id } });
    }

    update(id: number, updateBillDto: UpdateBillDto) {
        return this.prisma.bill.update({ where: { id }, data: updateBillDto });
    }

    remove(id: number) {
        return this.prisma.bill.delete({ where: { id } });
    }

    async disburse(id: number) {
        const bill = await this.prisma.bill.findUnique({
            where: { id },
            include: { template: true },
        });
        if (bill) {
            if (!bill.paid) {
                const cashPos: CashPosEntity =
                    await this.prisma.cashPos.findFirst({
                        where: { userId: bill.template.userId },
                    });

                const transaction: CreateTransactionDto = {
                    amount: new Decimal(1),
                    notes: 'Payment for ' + bill.notes,
                    type: 'EXPENSE',
                    price: bill.template.billAmount,
                    category: 'Bill Payment ' + bill.template.billName,
                    date: new Date(),
                    userId: bill.template.userId,
                };

                await this.prisma.transaction.create({ data: transaction });
                await this.prisma.cashPos.update({
                    where: { id: cashPos.id },
                    data: {
                        amount: cashPos.amount.minus(bill.template.billAmount),
                    },
                });
                return this.prisma.bill.update({
                    where: { id },
                    data: { paid: true },
                });
            }
        }
    }

    async generateBills(user: string) {
        const userData = await this.prisma.user.findUnique({
            where: { login: user },
        });
        const billTemplate = await this.prisma.billTemplate.findMany({
            where: { active: true, userId: userData.id },
        });
        const filtered = billTemplate.filter(
            (bill) => bill.frequency === 0 || bill.currFreq < bill.frequency,
        );

        for (const data of filtered) {
            await this.prisma.$transaction(async (tx) => {
                if (data.type !== 'WEEKLY') {
                    const invoiceData = await tx.bill.findFirst({
                        where: { templateId: data.id, paid: false },
                    });
                    if (!invoiceData) {
                        if (data.type === 'ONCE') {
                            data.active = false;
                        }
                        if (data.frequency !== 0) {
                            data.currFreq = data.currFreq + 1;

                            if (data.currFreq === data.frequency) {
                                data.active = false;
                            }
                        }
                        const createBillDto: CreateBillDto = {
                            month: new Date().getMonth() + 1,
                            year: new Date().getFullYear(),
                            notes:
                                data.billName +
                                ' ' +
                                getCurrentMonth(1) +
                                ' ' +
                                new Date().getFullYear(),
                            paid: false,
                            templateId: data.id,
                        };
                        await tx.bill.create({ data: createBillDto });
                        await tx.billTemplate.update({
                            where: { id: data.id },
                            data: {
                                currFreq: data.currFreq,
                                active: data.active,
                            },
                        });
                    }
                }
            });
        }
        return filtered;
    }

    async generateBill() {
        return this.prisma.$transaction(async (tx) => {
            const billTemplate = await tx.billTemplate.findMany({
                where: { active: true },
            });
            const filtered = billTemplate.filter(
                (bill) =>
                    bill.frequency === 0 || bill.currFreq < bill.frequency,
            );
            for (const data of filtered) {
                if (data.type !== 'WEEKLY') {
                    const invoiceData = await tx.bill.findFirst({
                        where: { templateId: data.id, paid: false },
                    });
                    if (!invoiceData) {
                        if (data.type === 'ONCE') {
                            data.active = false;
                        }
                        if (data.frequency !== 0) {
                            data.currFreq = data.currFreq + 1;

                            if (data.currFreq === data.frequency) {
                                data.active = false;
                            }
                        }
                        const createBillDto: CreateBillDto = {
                            month: new Date().getMonth() + 1,
                            year: new Date().getFullYear(),
                            notes:
                                data.billName +
                                ' ' +
                                getCurrentMonth(1) +
                                ' ' +
                                new Date().getFullYear(),
                            paid: false,
                            templateId: data.id,
                        };
                        await tx.bill.create({ data: createBillDto });
                        await tx.billTemplate.update({
                            where: { id: data.id },
                            data,
                        });
                    }
                }
            }
            return filtered;
        });
    }
}
