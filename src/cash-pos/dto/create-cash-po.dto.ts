import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateCashPoDto {
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
