import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { NotificationLogService } from './notification-log.service';
import { CreateNotificationLogDto } from './dto/create-notification-log.dto';
import { UpdateNotificationLogDto } from './dto/update-notification-log.dto';
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { NotificationLogEntity } from './entities/notification-log.entity';

@Controller('api')
@ApiBearerAuth()
@ApiTags('notification-logs')
export class NotificationLogController {
    constructor(
        private readonly notificationLogService: NotificationLogService,
    ) {}

    @Post('/notification-logs')
    @ApiCreatedResponse({ type: NotificationLogEntity })
    create(@Body() createNotificationLogDto: CreateNotificationLogDto) {
        return this.notificationLogService.create(createNotificationLogDto);
    }

    @Get('/notification-logs')
    @ApiOkResponse({ type: NotificationLogEntity, isArray: true })
    findAll() {
        return this.notificationLogService.findAll();
    }

    @Get('/notification-logs/:id')
    @ApiOkResponse({ type: NotificationLogEntity })
    findOne(@Param('id') id: string) {
        return this.notificationLogService.findOne(+id);
    }

    @Patch('/notification-logs/:id')
    @ApiOkResponse({ type: NotificationLogEntity })
    update(
        @Param('id') id: string,
        @Body() updateNotificationLogDto: UpdateNotificationLogDto,
    ) {
        return this.notificationLogService.update(
            +id,
            updateNotificationLogDto,
        );
    }

    @Delete('/notification-logs/:id')
    @ApiOkResponse()
    remove(@Param('id') id: string) {
        return this.notificationLogService.remove(+id);
    }
}
