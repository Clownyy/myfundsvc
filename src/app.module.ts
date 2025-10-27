import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { SysMenuModule } from './sys-menu/sys-menu.module';
import { BillTemplateModule } from './bill-template/bill-template.module';
import { BillModule } from './bill/bill.module';
import { TransactionModule } from './transaction/transaction.module';
import { SavingModule } from './saving/saving.module';
import { InstrumentModule } from './instrument/instrument.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CashPosModule } from './cash-pos/cash-pos.module';
import { StockModule } from './stock/stock.module';
import { NotificationLogModule } from './notification-log/notification-log.module';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, UsersModule, AuthModule, JwtModule, MailModule, ConfigModule.forRoot({
    isGlobal: true,
  }), SysMenuModule, BillTemplateModule, BillModule, TransactionModule, SavingModule, InstrumentModule, SchedulerModule, CashPosModule, StockModule, NotificationLogModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
})
export class AppModule {}
