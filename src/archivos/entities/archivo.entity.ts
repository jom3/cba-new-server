import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Archivo {

    @PrimaryGeneratedColumn('uuid')
    archivo_id:string;

    @Column('text')
	proyecto_id:string;

    @Column('text')
    nombre:string;

    @Column('text',{
        nullable:true
    })
	desc:string;

    @Column('text')
	archivo:string;

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

    @BeforeInsert()
    checkInsert(){
        this.creado_en = new Date()
    }

    @BeforeUpdate()
    checkUpdate(){
        this.modificado_en = new Date()
    }

    @ManyToOne(()=>Proyecto, (proyecto)=>proyecto.archivo)
    @JoinColumn({name:'proyecto_id'})
    proyecto:Proyecto;
}
