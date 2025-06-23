import { ApiProperty } from "@nestjs/swagger";

export class CreateSysMenuDto {
    @ApiProperty()
    menuCode: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    url: string;

    @ApiProperty()
    icon: string;

    @ApiProperty()
    isAdmin: boolean;
}
