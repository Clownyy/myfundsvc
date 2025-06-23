import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    login: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    resetKey: string;

    @ApiProperty()
    resetDate: Date;

    @ApiProperty()
    language: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
