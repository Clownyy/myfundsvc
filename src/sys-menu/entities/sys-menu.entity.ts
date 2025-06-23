import { ApiProperty } from "@nestjs/swagger";
import { SysMenu } from "@prisma/client";
export class SysMenuEntity implements SysMenu {
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
