import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavingService } from './saving.service';
import { CreateSavingDto } from './dto/create-saving.dto';
import { UpdateSavingDto } from './dto/update-saving.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SavingEntity } from './entities/saving.entity';
import { CurrentUser } from 'src/auth/decorate';

@Controller('api')
@ApiBearerAuth()
@ApiTags('savings')
export class SavingController {
	constructor(private readonly savingService: SavingService) { }

	@Post('/savings')
	@ApiCreatedResponse({ type: SavingEntity })
	create(@Body() createSavingDto: CreateSavingDto, @CurrentUser() user) {
		return this.savingService.create(createSavingDto, user.sub);
	}

	@Get('/savings')
	@ApiOkResponse({ type: SavingEntity, isArray: true })
	findAll(@CurrentUser() user) {
		return this.savingService.findAll(user.sub);
	}

	@Get('/savings/:id')
	@ApiOkResponse({ type: SavingEntity })
	findOne(@Param('id') id: string) {
		return this.savingService.findOne(+id);
	}

	@Patch('/savings/:id')
	@ApiOkResponse({ type: SavingEntity })
	update(@Param('id') id: string, @Body() updateSavingDto: UpdateSavingDto) {
		return this.savingService.update(+id, updateSavingDto);
	}

	@Delete('/savings/:id')
	@ApiOkResponse({ type: SavingEntity })
	remove(@Param('id') id: string) {
		return this.savingService.remove(+id);
	}

	@Get('/asset')
	@ApiOkResponse()
	getAsset(@CurrentUser() user) {
		return this.savingService.getAsset(user.sub);
	}
}
