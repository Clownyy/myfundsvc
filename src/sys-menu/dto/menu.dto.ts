import { ApiProperty } from "@nestjs/swagger";

export class MenuDto { 
    @ApiProperty()
    title: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    icon: string;
}