import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillTemplateService } from './bill-template.service';
import { CreateBillTemplateDto } from './dto/create-bill-template.dto';
import { UpdateBillTemplateDto } from './dto/update-bill-template.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BillTemplateEntity } from './entities/bill-template.entity';
import { CurrentUser } from 'src/auth/decorate';

@Controller('api')
@ApiBearerAuth()
@ApiTags('bill-templates')
export class BillTemplateController {
  constructor(private readonly billTemplateService: BillTemplateService) { }

  @Post('/bill-templates')
  @ApiCreatedResponse({ type: BillTemplateEntity })
  create(@Body() createBillTemplateDto: CreateBillTemplateDto, @CurrentUser() user) {
    return this.billTemplateService.create(createBillTemplateDto, user.sub);
  }

  @Get('/bill-templates')
  @ApiOkResponse({ type: BillTemplateEntity, isArray: true })
  findAll() {
    return this.billTemplateService.findAll();
  }

  @Get('/bill-templates/:id')
  @ApiOkResponse({ type: BillTemplateEntity })
  findOne(@Param('id') id: string) {
    return this.billTemplateService.findOne(+id);
  }

  @Patch('/bill-templates/:id')
  @ApiOkResponse({ type: BillTemplateEntity })
  update(@Param('id') id: string, @Body() updateBillTemplateDto: UpdateBillTemplateDto) {
    return this.billTemplateService.update(+id, updateBillTemplateDto);
  }

  @Delete('/bill-templates/:id')
  @ApiOkResponse({ type: BillTemplateEntity })
  remove(@Param('id') id: string) {
    return this.billTemplateService.remove(+id);
  }
}
