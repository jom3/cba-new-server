import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsArray, IsIn, IsEnum, IsDate } from "class-validator";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { CreateContactoDto } from "src/contactos/dto/create-contacto.dto";
import { Contacto } from "src/contactos/entities/contacto.entity";

const roles = ["Admin","Usuario","Personal"]
export class CreatePersonaDto extends PartialType(CreateContactoDto) {


    @IsString({message:'El nombre completo es requerido'})
    nombre_completo:string;

    @IsString()
    @IsIn(roles,{message:'Es necesario seleccionar un rol'})
    rol:string;

    @IsString()
    @IsOptional()
    foto?:string;

    @IsDate({message:'La fecha de nacimiento es requerido'})
    @Type(() => Date)
    fnac:Date;

    @IsString()
    @IsOptional()
    ci?:string;
    
    @IsOptional()
    contacto?:Contacto;
}
