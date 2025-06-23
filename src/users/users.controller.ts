import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { CurrentUser } from 'src/auth/decorate';

@Controller('api')
@ApiBearerAuth()
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("/users/createUser")
    @ApiCreatedResponse({ type: UserEntity })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get("/users")
    @ApiOkResponse({ type: UserEntity, isArray: true })
    findAll() {
        return this.usersService.findAll();
    }

    @Get('/users/:id')
    @ApiOkResponse({ type: UserEntity })
    findOne(@Param('id') id: number) {
        return this.usersService.findOne(+id);
    }

    @Patch('/users/:id')
    @ApiOkResponse({ type: UserEntity })
    update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete('/users/:id')
    @ApiOkResponse({ type: UserEntity })
    remove(@Param('id') id: number) {
        return this.usersService.remove(+id);
    }

    @Get('/account')
    @ApiOkResponse({type: UserEntity})
    findAccount(@CurrentUser() user) {
        return this.usersService.findOneByLogin(user.sub);
    }
}
