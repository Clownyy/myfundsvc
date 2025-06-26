import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateBillDto } from 'src/bill/dto/create-bill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { extractNumber, getCurrentMonth } from 'src/utils/utils';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { Decimal } from '@prisma/client/runtime/library';
import { BillService } from 'src/bill/bill.service';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);

    constructor(private prisma: PrismaService, private billService: BillService) { }

    @Cron('0 0 10 25 * *')
    // @Cron(CronExpression.EVERY_SECOND)
    async handleCron() {
        let billTemplate = await this.prisma.billTemplate.findMany({ where: { active: true } });
        this.billService.generateBill(billTemplate);
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async handleScrape() {
        this.logger.log("Scraping Gold from Indogold..");
        try {
            const { data } = await axios.get('https://www.indogold.id/');
            const $ = cheerio.load(data);
            const sellPrice = $('#basic-price')
                .parent()
                .find('font.size-24')
                .eq(2)
                .text()
                .trim();


            const price = extractNumber(sellPrice);
            await this.prisma.instrument.update({
                where: { instrumentCode: 'GOLD' },
                data: {
                    sellPrice: new Decimal(price),
                },
            })
        } catch (error) {
            this.logger.error("failed to scraping gold price", error);
        }

    }
}
