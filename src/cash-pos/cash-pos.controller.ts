import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashPosService } from './cash-pos.service';
import { CreateCashPoDto } from './dto/create-cash-po.dto';
import { UpdateCashPoDto } from './dto/update-cash-po.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorate';

@Controller('api')
@ApiBearerAuth()
@ApiTags('cash-pos')
export class CashPosController {
  constructor(private readonly cashPosService: CashPosService) {}

  @Post('/cash-pos')
  create(@Body() createCashPoDto: CreateCashPoDto) {
    return this.cashPosService.create(createCashPoDto);
  }

  @Get('/cash-pos')
  findAll(@CurrentUser() user) {
    return this.cashPosService.findAll(user.sub);
  }

  @Get('/cash-pos/:id')
  findOne(@Param('id') id: string) {
    return this.cashPosService.findOne(+id);
  }

  @Patch('/cash-pos/:id')
  update(@Param('id') id: string, @Body() updateCashPoDto: UpdateCashPoDto) {
    return this.cashPosService.update(+id, updateCashPoDto);
  }

  @Delete('/cash-pos/:id')
  remove(@Param('id') id: string) {
    return this.cashPosService.remove(+id);
  }
}
