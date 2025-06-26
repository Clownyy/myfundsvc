/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BillEntity } from './entities/bill.entity';
import { CurrentUser } from 'src/auth/decorate';

@Controller('api')
@ApiBearerAuth()
@ApiTags('bills')
export class BillController {
	constructor(private readonly billService: BillService) { }

	@Post('/bills')
	@ApiCreatedResponse({ type: BillEntity })
	create(@Body() createBillDto: CreateBillDto) {
		return this.billService.create(createBillDto);
	}

	@Get('/bills')
	@ApiOkResponse({ type: BillEntity, isArray: true })
	findAll(@CurrentUser() user) {
		return this.billService.findAll(user.sub);
	}

	@Get('/bills/:id')
	@ApiOkResponse({ type: BillEntity })
	findOne(@Param('id') id: string) {
		return this.billService.findOne(+id);
	}

	@Patch('/bills/:id')
	@ApiOkResponse({ type: BillEntity })
	update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
		return this.billService.update(+id, updateBillDto);
	}

	@Delete('/bills/:id')
	@ApiOkResponse({ type: BillEntity })
	remove(@Param('id') id: string) {
		return this.billService.remove(+id);
	}

	@Patch('/disburse/:id')
	@ApiOkResponse({ type: BillEntity })
	pay(@Param('id') id: string) {
		return this.billService.disburse(+id);
	}

	@Post('/generate-bills')
	@ApiCreatedResponse({ type: BillEntity, isArray: true })
	async generateBills(@CurrentUser() user) {
		return await this.billService.generateBills(user.sub);
	}
}
