import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Miembro {

    @PrimaryGeneratedColumn('uuid')
    miembro_id:string;

    @Column('text')
    persona_id:string;

    @Column('text')
    proyecto_id:string;

    @Column('text')
    rol:string;

    @Column('numeric',{
        default:1
    })
    estado:number;

    @Column('timestamp',{
        nullable:true
    })
    agregado_en:Date;
    @Column('timestamp',{
        nullable:true
    })
    modificado_en:Date;
    @Column('timestamp',{
        nullable:true
    })
    eliminado_en:Date;

    @BeforeInsert()
    checkInsert(){
        this.agregado_en=new Date()
    }
    
    @BeforeUpdate()
    checkUpdate(){
        this.modificado_en=new Date()
    }

    @ManyToOne(()=>Proyecto,(proyecto)=>proyecto.miembro)
    @JoinColumn({name:'proyecto_id'})
    proyecto:Proyecto;
}
