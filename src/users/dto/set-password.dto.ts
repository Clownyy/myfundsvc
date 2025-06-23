import { ApiProperty } from "@nestjs/swagger";

export class SetPasswordDto {
    @ApiProperty()
    key: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    confirmPassword: string;
}