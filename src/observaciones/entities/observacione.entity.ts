import { Persona } from "src/personas/entities/persona.entity";
import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Observacione {

    @PrimaryGeneratedColumn('uuid')
    observacion_id:string;

    @Column('text')
    razon:string;

    @Column('text')
    proyecto_id:string;

    @Column('text')
    persona_id:string;

    @Column('numeric',{
        default:1
    })
    estado:number;

    @Column('timestamp',{
        nullable:true
    })
    creado_en:Date;

    @Column('timestamp',{
        nullable:true
    })
    modificado_en:Date;

    @Column('timestamp',{
        nullable:true
    })
    enviado_en:Date;

    @Column('timestamp',{
        nullable:true
    })
    aceptado_en:Date;

    @Column('timestamp',{
        nullable:true
    })
    descartado_en:Date;

    @BeforeInsert()
    checkInsert(){
        this.enviado_en = new Date()
    }

    @BeforeUpdate()
    checkUpdate(){
        this.modificado_en = new Date()
    }

    @ManyToOne(()=>Proyecto,(proyecto)=>proyecto.observacion)
    @JoinColumn({name:'proyecto_id'})
    proyecto:Proyecto;

    @ManyToOne(()=>Persona,(persona)=>persona.observacion)
    @JoinColumn({name:'persona_id'})
    persona:Persona;
}
