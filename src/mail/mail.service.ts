import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendNewUser(user: CreateUserDto) {
        const url = process.env.BASE_URL_WEB + "confirmation/" + user.resetKey

        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Vitation | Please verify your account and set your password',
            template: './newuser',
            context: {
                name: user.firstName + " " + user.lastName,
                username: user.login,
                url,
            }
        });
    }
}
