import { IsArray, IsEmail, IsOptional, IsString, Matches } from "class-validator";

export class CreateContactoDto {

    @IsString()
    @IsOptional()
    direccion?:string;

    @IsString()
    email:string;

    @IsString({message:'El telefono es obligatorio'})
    telefono:string;
}
