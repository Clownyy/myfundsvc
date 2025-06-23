import { ApiProperty } from "@nestjs/swagger";
import { Saving } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class SavingEntity implements Saving {
    @ApiProperty()
    id: number;

    @ApiProperty()
    savingName: string;

    @ApiProperty()
    amount: Decimal;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    instrumentId: number;

    @ApiProperty()
    userId: number;
}
