import { Controller, Get } from '@nestjs/common';
import { StockService } from './stock.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorate';

@Controller('api')
@Public()
@ApiTags('stocks')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Get('stocks/sync-stocks')
    async syncStocks() {
        return this.stockService.syncStocks();
    }
}
