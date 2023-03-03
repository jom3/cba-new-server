import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposProyectoDto } from './create-tipos-proyecto.dto';

export class UpdateTiposProyectoDto extends PartialType(CreateTiposProyectoDto) {}
