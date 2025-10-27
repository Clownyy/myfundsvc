import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    email: string;

    password: string;

    @ApiProperty()
    login: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    coupleId: number;

    resetKey: string;

    resetDate: Date;

    roleUser: string;

    activated: boolean;

    deviceId: string;
}
