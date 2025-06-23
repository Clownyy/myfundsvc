import { ApiProperty } from "@nestjs/swagger";
import { $Enums, BillTemplate } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class BillTemplateEntity implements BillTemplate {
    @ApiProperty()
    id: number;

    @ApiProperty()
    billName: string;

    @ApiProperty()
    billAmount: Decimal;

    @ApiProperty()
    type: $Enums.BillType;

    @ApiProperty()
    currFreq: number;

    @ApiProperty()
    frequency: number;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    userId: number;
}
