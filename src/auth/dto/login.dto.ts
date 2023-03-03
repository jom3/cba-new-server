import { IsEmail, IsString, Matches } from "class-validator";

export class LoginDto {

    @IsEmail()
    @Matches("^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$")
    email:string;

    @IsString()
    password:string;

}
