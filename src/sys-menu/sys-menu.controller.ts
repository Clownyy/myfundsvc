/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SysMenuService } from './sys-menu.service';
import { CreateSysMenuDto } from './dto/create-sys-menu.dto';
import { UpdateSysMenuDto } from './dto/update-sys-menu.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SysMenuEntity } from './entities/sys-menu.entity';
import { MenuDto } from './dto/menu.dto';
import { CurrentUser } from 'src/auth/decorate';

@Controller('api')
@ApiBearerAuth()
@ApiTags('sys-menus')
export class SysMenuController {
  constructor(private readonly sysMenuService: SysMenuService) {}

  @Post("/sys-menus")
  @ApiCreatedResponse({ type: SysMenuEntity })
  create(@Body() createSysMenuDto: CreateSysMenuDto) {
    return this.sysMenuService.create(createSysMenuDto);
  }

  @Get("/sys-menus")
  @ApiOkResponse({ type: SysMenuEntity, isArray: true })
  findAll() {
    return this.sysMenuService.findAll();
  }

  @Get('/sys-menus/:menuCode')
  @ApiOkResponse({ type: SysMenuEntity })
  findOne(@Param('menuCode') menuCode: string) {
    return this.sysMenuService.findOne(menuCode);
  }

  @Patch('/sys-menus/:menuCode')
  @ApiOkResponse({ type: SysMenuEntity })
  update(@Param('menuCode') menuCode: string, @Body() updateSysMenuDto: UpdateSysMenuDto) {
    return this.sysMenuService.update(menuCode, updateSysMenuDto);
  }

  @Delete('/sys-menus/:menuCode')
  @ApiOkResponse({ type: SysMenuEntity })
  remove(@Param('menuCode') menuCode: string) {
    return this.sysMenuService.remove(menuCode);
  }

  @Get('/menus/list')
  @ApiOkResponse({ type: MenuDto, isArray: true })
  getMenusList(@CurrentUser() user) {
    return this.sysMenuService.getMenusList(user.sub);
  }
}
