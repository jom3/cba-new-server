import { Tarea } from "src/tareas/entities/tarea.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Avance {

    @PrimaryGeneratedColumn('uuid')
    avance_id:string;

    @Column('text')
    tarea_id:string;

    @Column('numeric',{
        default:0
    })
    avance:number;

    @Column('numeric',{
        default:1
    })
    estado:number;

    @Column('timestamp',{
        nullable:true
    })
    realizado_en:Date;

    @Column('timestamp',{
        nullable:true
    })
    bloqueado_en:Date;

    @ManyToOne(()=>Tarea,(tarea)=>tarea.avance)
    @JoinColumn({name:'tarea_id'})
    tarea:Tarea;

    @BeforeInsert()
    checkInsert(){
        this.realizado_en = new Date();
    }
}
