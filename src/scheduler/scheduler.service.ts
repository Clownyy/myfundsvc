/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { extractNumber } from 'src/utils/utils';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { Decimal } from '@prisma/client/runtime/library';
import { BillService } from 'src/bill/bill.service';
import { StockService } from 'src/stock/stock.service';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);

    constructor(private prisma: PrismaService, private billService: BillService, private stockService: StockService) { }

    // @Cron('0 0 10 25 * *')
    // @Cron(CronExpression.EVERY_SECOND)
    async handleCron() {
        this.billService.generateBill();
    }

    // @Cron(CronExpression.EVERY_5_MINUTES)
    async handleScrape() {
        this.logger.log("Scraping Gold from Indogold..");
        try {
            const { data } = await axios.get('https://www.indogold.id/');
            const $ = cheerio.load(data);
            const buyPrice = $('#basic-price')
                .parent()
                .find('font.size-24')
                .eq(1)
                .text()
                .trim();

            const sellPrice = $('#basic-price')
                .parent()
                .find('font.size-24')
                .eq(2)
                .text()
                .trim();
            
            const sell = extractNumber(sellPrice);
            const buy = extractNumber(buyPrice);
            await this.prisma.instrument.update({
                where: { instrumentCode: 'LGM' },
                data: {
                    sellPrice: new Decimal(sell),
                    buyPrice: new Decimal(buy),
                },
            })

            this.stockService.syncStocks();
        } catch (error) {
            this.logger.error("failed to scraping gold price", error);
        }

    }
}
