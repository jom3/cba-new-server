import { PartialType } from '@nestjs/mapped-types';
import { CreateObservacionDto } from './create-observacion.dto';

export class UpdateObservacionDto extends PartialType(CreateObservacionDto) {}
