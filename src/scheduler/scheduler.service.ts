/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';
import { extractNumber } from 'src/utils/utils';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { Decimal } from '@prisma/client/runtime/library';
import { BillService } from 'src/bill/bill.service';
import { StockService } from 'src/stock/stock.service';
import * as CryptoJS from 'crypto-js';
// import * as puppeteer from 'puppeteer';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);

    constructor(
        private prisma: PrismaService,
        private billService: BillService,
        private stockService: StockService,
    ) {}

    // @Cron('0 0 10 25 * *')
    // @Cron(CronExpression.EVERY_SECOND)
    async handleCron() {
        this.billService.generateBill();
    }

    // @Cron(CronExpression.EVERY_5_MINUTES)
    async handleScrape() {
        this.logger.log('Scraping Gold from Indogold..');
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
            });

            this.stockService.syncStocks();
            this.handleScrapeBibit();
        } catch (error) {
            this.logger.error('failed to scraping gold price', error);
        }
    }

    async handleScrapeBibit() {
        this.logger.log('Scraping Bibit..');
        const productCode = 'RD1657';
        try {
            const response = await axios.get(
                `https://api.bibit.id/products/${productCode}`,
            );
            const data = this.decrypt(response.data.data);
            const navValue = data.nav.value;

            await this.prisma.instrument.upsert({
                where: { instrumentCode: productCode, instrumentTypeId: 3 },
                update: {
                    instrumentName: data.name,
                    buyPrice: new Decimal(navValue),
                    sellPrice: new Decimal(navValue),
                    instrumentTypeId: 3,
                },
                create: {
                    instrumentCode: productCode,
                    instrumentName: data.name,
                    buyPrice: new Decimal(navValue),
                    sellPrice: new Decimal(navValue),
                    instrumentTypeId: 3,
                },
            });
            console.log('✅ NAV Value:', navValue);
        } catch (error) {
            console.error('❌ API fetch failed:', error.message);
        }
    }

    decrypt(data: any) {
        const iv = CryptoJS.enc.Hex.parse(data.slice(0, 32));
        const encryptedData = data.slice(32, -32);
        const secret = CryptoJS.enc.Utf8.parse(data.slice(-32));

        const bytes = CryptoJS.AES.decrypt(encryptedData, secret, {
            iv,
            mode: CryptoJS.mode.CBC,
            format: CryptoJS.format.Hex,
        });
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
}
