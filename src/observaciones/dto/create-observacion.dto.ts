import { IsString, IsUUID } from "class-validator";

export class CreateObservacionDto {

    @IsString()
    razon:string;

    @IsString()
    @IsUUID()
    proyecto_id:string;

    @IsString()
    @IsUUID()
    miembro_id:string;

}
