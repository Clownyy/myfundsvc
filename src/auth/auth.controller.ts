import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './login-response.dto';
import { LoginDto } from './login.dto';
import { Public } from './decorate';
import { SetPasswordDto } from 'src/users/dto/set-password.dto';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { CreateNotificationLogDto } from 'src/notification-log/dto/create-notification-log.dto';
import { NotificationLogService } from 'src/notification-log/notification-log.service';

@Controller('/api/auth')
@Public()
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly schedulerService: SchedulerService,
        private readonly notificationLogService: NotificationLogService,
    ) {}

    @Post()
    @ApiOkResponse({ type: LoginResponseDto })
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('/set-password')
    @ApiOkResponse({ type: LoginResponseDto })
    setPassword(@Body() setPasswordDto: SetPasswordDto) {
        return this.authService.setPassword(setPasswordDto);
    }

    @Get('/scrape')
    @ApiOkResponse()
    scrape() {
        return this.schedulerService.handleScrape();
    }

    @Get('/generate')
    @ApiOkResponse()
    generate() {
        return this.schedulerService.handleCron();
    }

    @Post('/store-notification')
    @ApiOkResponse()
    storeNotification(@Body() notificationDto: CreateNotificationLogDto) {
        return this.notificationLogService.create(notificationDto);
    }
}
