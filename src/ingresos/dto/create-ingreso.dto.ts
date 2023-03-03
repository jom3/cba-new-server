import { IsIn, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreateIngresoDto {

    @IsString()
    @IsUUID()
    institucion_id: string;

    @IsString()
    @IsUUID()
    proyecto_id: string;

    @IsNumber()
    @Min(0)
    ingreso: number;

    @IsNumber()
    @Min(0)
    cambio: number;

    @IsString()
    @IsIn(['Dolares','Bolivianos'])
    divisa: string;

    @IsString()
    comprobante: string;
  
}
