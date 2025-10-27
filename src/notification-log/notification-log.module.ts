import { Module } from '@nestjs/common';
import { NotificationLogService } from './notification-log.service';
import { NotificationLogController } from './notification-log.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [NotificationLogController],
    providers: [NotificationLogService],
    imports: [PrismaModule],
})
export class NotificationLogModule {}
