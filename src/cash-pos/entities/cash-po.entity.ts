import { ApiProperty } from "@nestjs/swagger";
import { CashPos } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class CashPosEntity implements CashPos {
    @ApiProperty()
    id: number;

    @ApiProperty()
    amount: Decimal;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    userId: number;
}
