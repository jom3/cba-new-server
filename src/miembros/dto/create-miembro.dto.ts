import { IsIn, IsString, IsUUID } from "class-validator";

export class CreateMiembroDto {

    @IsString()
    @IsUUID()
    persona_id:string;

    @IsString()
    @IsUUID()
    proyecto_id:string;

    @IsString()
    @IsIn(['Lider','Miembro'])
    rol:string;

}
