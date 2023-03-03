import { IsArray, IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductoDto{

    @IsString()
    nombre:string;

    @IsString()
    @IsOptional()
    desc?:string;

    @IsString()
    modelo:string;

    @IsString()
    @IsOptional()
    categoria?:string;

    @IsNumber()
    @Min(0)
    precio:number;

    @IsString()
    @IsIn(['Bolivianos','Dolares'])
    moneda:string;
}
