import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateContactoDto } from "src/contactos/dto/create-contacto.dto";
import { Contacto } from "src/contactos/entities/contacto.entity";

const tipos = ['Financiador','Proveedor']; 

export class CreateInstitucioneDto extends CreateContactoDto{

    @IsString()
    nombre: string;

    @IsString()
    @IsOptional()
    desc?: string;

    @IsString()
    @IsIn(tipos)
    tipo: string;

    @IsOptional()
    contacto: Contacto;
}
