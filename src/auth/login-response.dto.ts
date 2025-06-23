import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty()
    id_token: string;
}