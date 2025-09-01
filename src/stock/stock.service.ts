import { Injectable, Logger } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { google } from 'googleapis';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockService {
    private sheets;
    private readonly logger = new Logger(StockService.name);
    constructor(private prisma: PrismaService) {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
        })

        this.sheets = google.sheets({ version: 'v4', auth })
    }

    async syncStocks() {
        this.logger.log('Syncing stock...')
        const spreadsheetId = "18cmXd8PxrdJyO8MZWf9XvzxO_X5Az2ObybSNCfrnwiY";
        const range = 'stock_dictionary!A1:C956';
        const res = await this.sheets.spreadsheets.values.get({
            spreadsheetId,
            range
        });

        this.logger.log(`Found ${res.data.values.length} stocks`);
        const stocks = res.data.values.filter((row) => row[0] == 'BBCA' || row [0] == 'CUAN');
        await Promise.all(
            stocks.map((stock) =>
                this.prisma.instrument.upsert({
                    where: { instrumentCode: stock[0], instrumentTypeId: 1 },
                    update: {
                        instrumentName: stock[1],
                        buyPrice: new Decimal(stock[2]),
                        sellPrice: new Decimal(stock[2]),
                        instrumentTypeId: 1,
                    },
                    create: {
                        instrumentCode: stock[0],
                        instrumentName: stock[1],
                        buyPrice: new Decimal(stock[2]),
                        sellPrice: new Decimal(stock[2]),
                        instrumentTypeId: 1,
                    },
                })
            )
        );
    }
}
