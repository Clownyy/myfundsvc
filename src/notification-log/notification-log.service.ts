import { Injectable, Logger } from '@nestjs/common';
import { CreateNotificationLogDto } from './dto/create-notification-log.dto';
import { UpdateNotificationLogDto } from './dto/update-notification-log.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationLogService {
    private readonly logger = new Logger(NotificationLogService.name);
    constructor(private prisma: PrismaService) {}

    create(createNotificationLogDto: CreateNotificationLogDto) {
        return this.prisma.notificationLog.create({
            data: createNotificationLogDto,
        });
    }

    findAll() {
        return this.prisma.notificationLog.findMany();
    }

    findOne(id: number) {
        return this.prisma.notificationLog.findUnique({
            where: { id },
        });
    }

    update(id: number, updateNotificationLogDto: UpdateNotificationLogDto) {
        return this.prisma.notificationLog.update({
            where: { id },
            data: updateNotificationLogDto,
        });
    }

    remove(id: number) {
        return this.prisma.notificationLog.delete({
            where: { id },
        });
    }
}
