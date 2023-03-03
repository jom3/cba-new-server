import { IsString, IsUUID } from "class-validator";

export class CreateBeneficiarioDto {

    @IsString()
    @IsUUID()
    proyecto_id:string;

    @IsString()
    @IsUUID()
    persona_id:string;
}