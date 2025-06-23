import { ApiProperty } from "@nestjs/swagger";
import { Instrument } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class InstrumentEntity implements Instrument {
    @ApiProperty()
    id: number;

    @ApiProperty()
    instrumentCode: string;

    @ApiProperty()
    instrumentName: string;

    @ApiProperty()
    buyPrice: Decimal;

    @ApiProperty()
    sellPrice: Decimal;
}
