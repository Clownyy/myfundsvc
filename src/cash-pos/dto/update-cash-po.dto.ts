import { PartialType } from '@nestjs/swagger';
import { CreateCashPoDto } from './create-cash-po.dto';

export class UpdateCashPoDto extends PartialType(CreateCashPoDto) {}
