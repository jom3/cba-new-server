import { IsIn, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreateEgresoDto {

    @IsString()
    @IsUUID()
    persona_id: string;

    @IsString()
    @IsUUID()
    proyecto_id: string;

    @IsNumber()
    @Min(0)
    egreso: number;

    @IsNumber()
    @Min(0)
    cambio: number;

    @IsString()
    @IsIn(['Dolares','Bolivianos'])
    divisa: string;

    @IsString()
    comprobante: string;
  
}
