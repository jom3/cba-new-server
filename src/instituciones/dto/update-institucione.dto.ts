import { PartialType } from '@nestjs/mapped-types';
import { CreateInstitucioneDto } from './create-institucione.dto';

export class UpdateInstitucioneDto extends PartialType(CreateInstitucioneDto) {}
