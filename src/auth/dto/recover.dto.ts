import { IsEmail, IsString } from "class-validator";

export class RecoverDto{

    @IsString()
    @IsEmail()
    email:string;
}