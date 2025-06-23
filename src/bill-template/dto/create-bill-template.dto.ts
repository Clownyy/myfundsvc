import { ApiProperty } from "@nestjs/swagger";
import { $Enums, BillTemplate } from "@prisma/client";

export class CreateBillTemplateDto {
    @ApiProperty()
    billName: string;

    @ApiProperty()
    billAmount: number;

    @ApiProperty()
    type: $Enums.BillType;

    @ApiProperty()
    currFreq: number;

    @ApiProperty()
    frequency: number;

    @ApiProperty()
    active: boolean;

    userId: number;
}
