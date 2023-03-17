import { Avance } from "src/avances/entities/avance.entity";
import { Egreso } from "src/egresos/entities/egreso.entity";
import { Miembro } from "src/miembros/entities/miembro.entity";
import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tarea {

    @PrimaryGeneratedColumn('uuid')
    tarea_id:string;

    @Column('text')
    tarea:string;

    @Column('text',{
        nullable:true
    })
    desc:string;

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
    eliminado_en:Date;

    @Column('timestamp',{
        nullable:true
    })
    completado_en:Date;

    @BeforeInsert()
    checkInsert(){
        this.creado_en = new Date();
    }

    @BeforeUpdate()
    checkUpdate(){
        this.modificado_en = new Date();
    }
    @ManyToOne(()=>Proyecto,(proyecto)=>proyecto.tarea)
    @JoinColumn({name:'proyecto_id'})
    proyecto:Proyecto;
    
    @ManyToOne(()=>Miembro,(miembro)=>miembro.tarea,{
        eager:true
    })
    @JoinColumn({name:'miembro_id'})
    miembro:Miembro;

    @OneToMany(()=>Avance,(avance)=>avance.tarea,{
        eager:true,
        nullable:true,
        cascade:true
    })
    avance:Avance;
}
