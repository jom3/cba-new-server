import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateBeneficiarioDto {

    @IsString()
    @IsUUID()
    proyecto_id:string;

    @IsString()
    @IsUUID()
    persona_id:string;

    @IsString()
    @IsOptional()
    archivo?:string;

    @IsString()
    @IsOptional()
    observacion?:string;

}