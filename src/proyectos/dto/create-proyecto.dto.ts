
import { Type } from "class-transformer";
import { IsArray, IsDate, IsDateString, IsIn, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";
import { IsNull } from "typeorm";

export class CreateProyectoDto {

  @IsString()
  titulo: string;

  @IsString()
  caracter: string;

  @IsString()
  justificacion: string;

  @IsString()
  objetivo: string;

  @IsNumber()
  @Min(0)
  costo: number;

  @IsString()
  @IsIn(['Dolares','Bolivianos'])
  moneda: string;

  @IsDate()
  @Type(() => Date)
  f_inicio: Date;
  
  @IsDate()
  @Type(() => Date)
  f_ejecucion: Date;
  
  @IsDate()
  @Type(() => Date)
  f_fin: Date;

  @IsString()
  persona_id: string;

  @IsString()
  @IsOptional()
  institucion_id?: string;

  @IsString()
  @IsOptional()
  producto_id?: string;
  
  @IsString()
  @IsOptional()
  servicio_id?: string;

  @IsString()
  tipo_id: string;
}

