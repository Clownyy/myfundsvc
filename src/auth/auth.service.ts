import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDto } from './login-response.dto';
import { jwtConstants } from './constants';
import { compareHash, encrypt } from 'src/helper/helper';
import { SetPasswordDto } from 'src/users/dto/set-password.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private userService: UsersService,
        private jwt: JwtService,
    ) {}

    async login(loginDto: LoginDto) {
        const user = await this.userService.findOneByLogin(loginDto.username);
        if (user == null) {
            throw new BadRequestException('Invalid Login');
        }
        if (!compareHash(loginDto.password, user.password)) {
            throw new BadRequestException('Invalid Password');
        }

        const payload = {
            id: user.id,
            sub: user.login,
            email: user.email,
        };

        const options = {
            secret: jwtConstants.secret,
            expiresIn: '24h',
        };

        const res = new LoginResponseDto();
        res.id_token = await this.jwt.signAsync(payload, options);

        // user.deviceId = loginDto.deviceId;
        if (loginDto.deviceId) {
            await this.userService.update(user.id, {
                deviceId: loginDto.deviceId,
            });
        }

        return res;
    }

    async setPassword(setPasswordDto: SetPasswordDto) {
        const user = await this.userService.findOneByKey(setPasswordDto.key);
        if (user == null) {
            throw new BadRequestException('Invalid Key!');
        }
        const duration = 60 * 60 * 1000;
        const resetTime = user.resetDate.getTime();
        const timeNow = new Date().getTime();

        if (resetTime > timeNow - duration) {
            const updateUser = new UpdateUserDto();
            updateUser.resetKey = null;
            updateUser.resetDate = null;
            updateUser.activated = true;
            updateUser.password = encrypt(setPasswordDto.password);

            await this.userService.update(user.id, updateUser);

            const payload = {
                id: user.id,
                sub: user.login,
                email: user.email,
            };

            const options = {
                secret: jwtConstants.secret,
                expiresIn: '24h',
            };

            const res = new LoginResponseDto();
            res.id_token = await this.jwt.signAsync(payload, options);

            return res;
        }

        throw new BadRequestException('Key Expired!');
    }
}
