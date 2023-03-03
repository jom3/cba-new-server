import { Avance } from "src/avances/entities/avance.entity";
import { Egreso } from "src/egresos/entities/egreso.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tarea {

    @PrimaryGeneratedColumn('uuid')
    tarea_id:string;

    @Column('text')
    proyecto_id:string;

    @Column('text')
    miembro_id:string;

    @Column('text')
    tarea:string;

    @Column('text',{
        nullable:true
    })
    desc:string;

    @Column('text',{
        nullable:true
    })
    egreso_id:string;

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

    @OneToMany(()=>Avance,(avance)=>avance.tarea,{
        eager:true,
        nullable:true,
        cascade:true
    })
    avance:Avance;

    @OneToOne(()=>Egreso,(egreso)=>egreso.tarea,{
        eager:true,
        cascade:true,
        nullable:true
    })
    egreso:Egreso;

    @BeforeInsert()
    checkInsert(){
        this.creado_en = new Date();
    }

    @BeforeUpdate()
    checkUpdate(){
        this.modificado_en = new Date();
    }


}
