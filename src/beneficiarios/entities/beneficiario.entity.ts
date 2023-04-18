import { Persona } from "src/personas/entities/persona.entity";
import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Beneficiario {

    @PrimaryGeneratedColumn('uuid')
    beneficiario_id:string;

    @Column('text',{
        nullable:true
    })
    archivo:string;

    @Column('text')
    proyecto_id:string;

    @Column('text',{
        nullable:true
    })
    observacion:string;

    @Column('numeric',{
        default:2
    })
    estado:number;

    @Column('timestamp',{
        nullable:true
    })
    postulado_en:Date;

    @Column('timestamp',{
        nullable:true
    })
    aceptado_en:Date;

    @Column('timestamp',{
        nullable:true
    })
    rechazado_en:Date;

    @BeforeInsert()
    checkInsert(){
        this.postulado_en = new Date();
    }

    @ManyToOne(()=>Proyecto,(proyecto)=>proyecto.beneficiario)
    @JoinColumn({name:'proyecto_id'})
    proyecto:Proyecto;

    @ManyToOne(()=>Persona,(persona)=>persona.beneficiario,{
        eager:true,
        cascade:true
    })
    @JoinColumn({name:'persona_id'})
    persona:Persona;
}
