import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Transaction } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class TransactionEntity implements Transaction {
    @ApiProperty()
    id: number;

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
    userId: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
