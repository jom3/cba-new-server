import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateArchivoDto {

    @IsString()
    @IsUUID()
    proyecto_id:string;

    @IsString()
    nombre:string;

    @IsString()
    @IsOptional()
	desc?:string;

    @IsString()
	archivo:string;
}
