import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTareaDto {

    @IsString()
    @IsUUID()
    proyecto_id:string;

    @IsString()
    @IsUUID()
    miembro_id:string;

    @IsString()
    tarea:string;
    
    @IsString()
    @IsOptional()
    desc?:string;

    @IsString()
    @IsOptional()
    egreso_id?:string;
}