import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MailModule } from 'src/mail/mail.module';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { BillService } from 'src/bill/bill.service';

@Module({
    imports: [UsersModule, MailModule],
    providers: [AuthService, PrismaService, UsersService, JwtService, SchedulerService, BillService],
    controllers: [AuthController],
})
export class AuthModule { }