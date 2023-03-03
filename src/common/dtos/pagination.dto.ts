import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationDto{

    @IsNumber()
    @IsOptional()
    limit:number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    offset:number;
}