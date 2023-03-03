import { IsNumber, IsString, IsUUID, isUUID, Max, Min } from "class-validator";

export class CreateAvanceDto {
    
    @IsString()
    @IsUUID()
    tarea_id:string;

    @IsNumber()
    @Max(100)
    @Min(0)
    avance:number;
}
