import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationLogDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    package: string;
    @ApiProperty()
    deviceId: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}
