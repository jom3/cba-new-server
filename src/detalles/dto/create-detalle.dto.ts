import { IsIn, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateDetalleDto {

    @IsString()
    detalle: string;

    @IsNumber()
    precio: number;

    @IsString()
    @IsIn(['Bolivianos','Dolares'])
    moneda: string;

    @IsString()
    @IsUUID()
    servicio_id:string;
  
}
