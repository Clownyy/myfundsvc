import { Injectable, Logger } from '@nestjs/common';
import { CreateSysMenuDto } from './dto/create-sys-menu.dto';
import { UpdateSysMenuDto } from './dto/update-sys-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SysMenuEntity } from './entities/sys-menu.entity';
import { MenuDto } from './dto/menu.dto';

@Injectable()
export class SysMenuService {
	private readonly logger = new Logger(SysMenuService.name)

	constructor(private prisma: PrismaService) { }

	create(createSysMenuDto: CreateSysMenuDto) {
		return this.prisma.sysMenu.create({ data: createSysMenuDto });
	}

	findAll() {
		return this.prisma.sysMenu.findMany();
	}

	findOne(menuCode: string) {
		return this.prisma.sysMenu.findUnique({ where: { menuCode } });
	}

	update(menuCode: string, updateSysMenuDto: UpdateSysMenuDto) {
		const { id, ...data } = updateSysMenuDto as UpdateSysMenuDto & { id?: string };
		return this.prisma.sysMenu.update({ where: { menuCode }, data: data });
	}

	remove(menuCode: string) {
		return this.prisma.sysMenu.delete({ where: { menuCode } });
	}

	async getMenusList(user: string) {
		let sysMenus: SysMenuEntity[];
		let userData = await this.prisma.user.findFirst({ where: { login: user } });

		if (userData.roleUser.includes("F_ADMIN")) {
			sysMenus = await this.prisma.sysMenu.findMany({ orderBy: [{ isAdmin: "asc" }, { menuCode: "asc" }] });
		} else {
			sysMenus = await this.prisma.sysMenu.findMany({ orderBy: [{ menuCode: "asc" }], where: { isAdmin: false } });
		}

		let result: MenuDto[] = [];
		sysMenus.map((sysMenu: SysMenuEntity) => {
			result.push(
				{
					title: sysMenu.title,
					url: sysMenu.url,
					icon: sysMenu.icon,
					isAdmin: sysMenu.isAdmin,
					menuCode: sysMenu.menuCode
				}
			);
		});
		return result;
	}
}
