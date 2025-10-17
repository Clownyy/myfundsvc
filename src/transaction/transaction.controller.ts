import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TransactionEntity } from './entities/transaction.entity';
import { CurrentUser } from 'src/auth/decorate';

@Controller('api')
@ApiBearerAuth()
@ApiTags('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) { }

  @Post('/transactions')
  @ApiCreatedResponse({ type: TransactionEntity })
  create(@Body() createTransactionDto: CreateTransactionDto, @CurrentUser() user) {
    return this.transactionService.create(createTransactionDto, user.sub);
  }

  @Get('/transactions')
  @ApiOkResponse({ type: TransactionEntity, isArray: true })
  findAll(@CurrentUser() user) {
    return this.transactionService.findAll(user.sub);
  }

  @Get('/transactions/:id')
  @ApiOkResponse({ type: TransactionEntity })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch('/transactions/:id')
  @ApiOkResponse({ type: TransactionEntity })
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete('/transactions/:id')
  @ApiOkResponse({ type: TransactionEntity })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }

  @Get('/profit-loss')
	@ApiOkResponse()
	getProfitLoss(@CurrentUser() user) {
		return this.transactionService.getProfitLoss(user.sub);
	}
}
