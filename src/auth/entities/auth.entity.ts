import { Persona } from "src/personas/entities/persona.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Auth {

    @PrimaryColumn()
    persona_id:string;
    
    @OneToOne(
        ()=>Persona
    )
    @JoinColumn({name:'persona_id'})
    persona:Persona

    @Column('text',{
        nullable:false
    })
    email:string;

    @Column('text',{
        nullable:false
    })
    password:string;

}
