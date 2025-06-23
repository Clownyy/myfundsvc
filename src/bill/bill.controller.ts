import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BillEntity } from './entities/bill.entity';

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
  findAll() {
    return this.billService.findAll();
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
}
