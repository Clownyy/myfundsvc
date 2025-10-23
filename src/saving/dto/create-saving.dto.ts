import { ApiProperty } from '@nestjs/swagger';

export class CreateSavingDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    savingName: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    date: Date;

    @ApiProperty()
    instrumentId: number;

    userId: number;
}
