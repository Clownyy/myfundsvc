import { PartialType } from '@nestjs/swagger';
import { CreateBillTemplateDto } from './create-bill-template.dto';

export class UpdateBillTemplateDto extends PartialType(CreateBillTemplateDto) {}
