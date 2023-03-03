import { IsOptional, IsString } from "class-validator";

export class CreateTiposProyectoDto {

    @IsString()
    nombre:string;

    @IsString()
    @IsOptional()
    desc?:string;
}
