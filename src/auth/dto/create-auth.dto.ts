import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { Persona } from "src/personas/entities/persona.entity";

export class CreateAuthDto {

    @IsString()
    persona_id:string

    @IsEmail()
    @Matches("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$")
    @IsOptional()
    email?:string;
    
    @IsString()
    @IsOptional()
    password?:string;

}
