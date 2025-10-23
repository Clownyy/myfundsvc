import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { encrypt, randString } from 'src/helper/helper';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        private prisma: PrismaService,
        private mailService: MailService,
    ) {}

    create(createUserDto: CreateUserDto) {
        const resetKey = randString(100);
        const now = new Date();
        now.setHours(now.getHours() + 1);

        createUserDto.resetKey = resetKey;
        createUserDto.resetDate = new Date(now);
        createUserDto.password = encrypt('Vitation123$'); //set default password
        createUserDto.roleUser = 'F_USER';
        createUserDto.activated = false;
        const user = this.prisma.user.create({ data: createUserDto });
        this.mailService.sendNewUser(createUserDto);
        return user;
    }

    findAll() {
        return this.prisma.user.findMany();
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    findOneByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    findOneByLogin(login: string) {
        return this.prisma.user.findUnique({
            where: { login: login, activated: true },
        });
    }

    findOneByKey(key: string) {
        return this.prisma.user.findFirst({
            where: {
                resetKey: key,
            },
        });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
