import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class HoldingDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    savingName: string;

    @ApiProperty()
    instrumentCode: string;

    @ApiProperty()
    instrumentName: string;

    @ApiProperty()
    amount: Decimal;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    profit: Decimal;

    @ApiProperty()
    value: Decimal;
}
