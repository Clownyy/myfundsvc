import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InstrumentEntity } from './entities/instrument.entity';

@Controller('api')
@ApiBearerAuth()
@ApiTags('instruments')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Post('/instruments')
  @ApiCreatedResponse({ type: InstrumentEntity })
  create(@Body() createInstrumentDto: CreateInstrumentDto) {
    return this.instrumentService.create(createInstrumentDto);
  }

  @Get('/instruments')
  @ApiOkResponse({ type: InstrumentEntity, isArray: true })
  findAll() {
    return this.instrumentService.findAll();
  }

  @Get('/instruments/:id')
  @ApiOkResponse({ type: InstrumentEntity })
  findOne(@Param('id') id: string) {
    return this.instrumentService.findOne(+id);
  }

  @Patch('/instruments/:id')
  @ApiOkResponse({ type: InstrumentEntity })
  update(@Param('id') id: string, @Body() updateInstrumentDto: UpdateInstrumentDto) {
    return this.instrumentService.update(+id, updateInstrumentDto);
  }

  @Delete('/instruments/:id')
  @ApiOkResponse({ type: InstrumentEntity })
  remove(@Param('id') id: string) {
    return this.instrumentService.remove(+id);
  }
}
