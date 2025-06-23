import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";

export class CreateTransactionDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    type: $Enums.TransactionType;

    @ApiProperty()
    price: number;

    @ApiProperty()
    category: string;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    notes: string;
}
