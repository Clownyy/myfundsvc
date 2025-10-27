import { ApiProperty } from '@nestjs/swagger';
import { NotificationLog } from '@prisma/client';
export class NotificationLogEntity implements NotificationLog {
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
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    userId: number;
}
