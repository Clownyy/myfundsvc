import { ApiProperty } from "@nestjs/swagger";

export class CreateBillDto {
    @ApiProperty()
    month: number;

    @ApiProperty()
    year: number;

    @ApiProperty()
    notes: string;

    @ApiProperty()
    paid: boolean;

    @ApiProperty()
    templateId: number;
}
