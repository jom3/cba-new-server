import { Institucion } from "src/instituciones/entities/institucion.entity";
import { Persona } from "src/personas/entities/persona.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";

@Entity()
export class Contacto {

    @PrimaryGeneratedColumn('uuid')
    contacto_id:string;

    @Column('text',{
        nullable:true
    })
    direccion:string;

    @Column('text',{
        nullable:false,
        unique:true
    })
    email:string;

    @Column('text',{
        nullable:false,
    })
    telefono:string;

    @OneToOne(
        ()=>Persona,
        persona=>persona.contacto
    )
    persona:Persona

    @OneToOne(
        ()=>Institucion,
        institucion=>institucion.contacto
    )
    institucion:Institucion;
}
