import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateTransactionDto {
    @ApiProperty()
    amount: Decimal;

    @ApiProperty()
    type: $Enums.TransactionType;

    @ApiProperty()
    price: Decimal;

    @ApiProperty()
    category: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    notes: string;

    @ApiProperty()
    savingId?: number;

    @ApiProperty()
    userId: number;
}
