import { IsIn, IsNumber, IsString, IsUUID, Min } from "class-validator";

export class CreateInventarioDto {
    
    @IsNumber()
    @Min(0)
    cantidad: number;

    @IsString()
    unidad_medida: string;

    @IsString()
    @IsUUID()
    producto_id:string;
}
