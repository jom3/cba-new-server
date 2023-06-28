import { IsArray, IsEmail, IsOptional, IsString, Matches } from "class-validator";

export class CreateContactoDto {

    @IsString()
    @IsOptional()
    direccion?:string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString({message:'El telefono es obligatorio'})
    telefono:string;
}
