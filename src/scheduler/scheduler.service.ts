import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateBillDto } from 'src/bill/dto/create-bill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { getCurrentMonth } from 'src/utils/utils';

@Injectable()
export class SchedulerService {
    private readonly logger = new Logger(SchedulerService.name);

    constructor(private prisma: PrismaService) { }

    @Cron('0 0 10 25 * *')
    async handleCron() {
        let billTemplate = await this.prisma.billTemplate.findMany({ where: { active: true } });

        const filtered = billTemplate.filter(bill => bill.frequency === 0 || bill.currFreq < bill.frequency);
        for (let data of filtered) {
            if (data.type !== 'WEEKLY') {
                const invoiceData = await this.prisma.bill.findFirst({ where: { templateId: data.id, paid: false } })
                if (!invoiceData) {
                    if (data.type === "ONCE") {
                        data.active = false
                    }
                    if (data.frequency !== 0) {
                        data.currFreq = data.currFreq + 1;

                        if (data.currFreq === data.frequency) {
                            data.active = false
                        }
                    }
                    const createBillDto: CreateBillDto = {
                        month: new Date().getMonth() + 1,
                        year: new Date().getFullYear(),
                        notes: data.billName + " " + getCurrentMonth() + " " + new Date().getFullYear(),
                        paid: false,
                        templateId: data.id
                    }
                    await this.prisma.bill.create({ data: createBillDto });
                    await this.prisma.billTemplate.update({ where: { id: data.id }, data });
                }
            }
        }
    }
}
