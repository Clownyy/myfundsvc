import { ApiProperty } from "@nestjs/swagger";
import { Bill } from "@prisma/client";

export class BillEntity implements Bill {
    @ApiProperty()
    id: number;

    @ApiProperty()
    month: number;

    @ApiProperty()
    year: number;
    
    @ApiProperty()
    notes: string;

    @ApiProperty()
    paid: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    templateId: number;
}
