import { Injectable, Logger } from '@nestjs/common';
import { CreateSavingDto } from './dto/create-saving.dto';
import { UpdateSavingDto } from './dto/update-saving.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { PortfollioDto } from './dto/portfolio.dto';
import { HoldingDto } from './dto/holding.dto';

@Injectable()
export class SavingService {
    private readonly logger = new Logger(SavingService.name);
    constructor(private prisma: PrismaService) {}

    async create(createSavingDto: CreateSavingDto, login: string) {
        const user = await this.prisma.user.findUnique({
            where: { login: login },
        });
        createSavingDto.userId = user.id;
        createSavingDto.date = new Date();
        return this.prisma.saving.create({ data: createSavingDto });
    }

    async findAll(user: string) {
        const userData = await this.prisma.user.findUnique({
            where: { login: user },
        });
        const savings = await this.prisma.saving.findMany({
            include: { instrument: true },
            where: { userId: userData.id },
        });

        const savingAmount = savings.reduce((sum: Decimal, item) => {
            return sum.plus(item.amount.mul(item.instrument.sellPrice));
        }, new Decimal(0));

        const profitAmount = savings.reduce((sum: Decimal, item) => {
            return sum.plus(
                item.amount
                    .mul(item.instrument.sellPrice)
                    .minus(item.totalCost ?? 0),
            );
        }, new Decimal(0));

        const totalCost = savings.reduce((sum: Decimal, item) => {
            return sum.plus(item.totalCost ?? 0);
        }, new Decimal(0));

        const porto = new PortfollioDto();
        const holdings = new Array<HoldingDto>();
        for (const saving of savings) {
            const profit = saving.amount
                .mul(saving.instrument.sellPrice)
                .minus(saving.totalCost ?? 0);
            holdings.push({
                id: saving.id,
                savingName: saving.savingName,
                instrumentCode: saving.instrument.instrumentCode,
                instrumentName: saving.instrument.instrumentName,
                amount: saving.amount,
                date: saving.date,
                value: saving.amount.mul(saving.instrument.sellPrice),
                profit: profit,
            });
        }
        porto.totalValue = savingAmount;
        porto.totalProfit = profitAmount.div(totalCost).mul(100);
        porto.holdings = holdings;
        return porto;
    }

    findOne(id: number) {
        return this.prisma.saving.findUnique({ where: { id } });
    }

    update(id: number, updateSavingDto: UpdateSavingDto) {
        return this.prisma.saving.update({
            where: { id },
            data: updateSavingDto,
        });
    }

    remove(id: number) {
        return this.prisma.saving.delete({ where: { id } });
    }

    async getAsset(user: string) {
        const userData = await this.prisma.user.findUnique({
            where: { login: user },
        });
        const cashPos = await this.prisma.cashPos.findUnique({
            where: { userId: userData.id },
        });
        const saving = await this.prisma.saving.findMany({
            where: { userId: userData.id },
            select: {
                amount: true,
                instrument: { select: { sellPrice: true } },
            },
        });
        const savingAmount = saving.reduce((sum: Decimal, item) => {
            return sum.plus(item.amount.mul(item.instrument.sellPrice));
        }, new Decimal(0));

        return cashPos.amount.plus(savingAmount);
    }
}
