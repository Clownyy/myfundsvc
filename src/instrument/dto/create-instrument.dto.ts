import { ApiProperty } from "@nestjs/swagger";

export class CreateInstrumentDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    instrumentCode: string;

    @ApiProperty()
    instrumentName: string;

    @ApiProperty()
    buyPrice: number;

    @ApiProperty()
    sellPrice: number;
}
