import { PartialType } from '@nestjs/mapped-types';
import { CreateAvanceDto } from './create-avance.dto';

export class UpdateAvanceDto extends PartialType(CreateAvanceDto) {}
