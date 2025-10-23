import { ApiProperty } from '@nestjs/swagger';
import { HoldingDto } from './holding.dto';
import { Decimal } from '@prisma/client/runtime/library';

export class PortfollioDto {
    @ApiProperty()
    totalValue: Decimal;

    @ApiProperty()
    totalProfit: Decimal;

    @ApiProperty()
    holdings: HoldingDto[];
}
