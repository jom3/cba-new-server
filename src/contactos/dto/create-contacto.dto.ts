import { IsArray, IsEmail, IsOptional, IsString, Matches } from "class-validator";

export class CreateContactoDto {

    @IsString()
    @IsOptional()
    direccion?:string;

    @IsEmail({},{message:'El correo electronico es obligatorio'})
    @Matches("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$",'',{
        message:'El correo ingresado no es de gmail'
    })
    email:string;

    @IsString({message:'El telefono es obligatorio'})
    telefono:string;
}
