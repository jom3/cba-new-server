import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TiposProyecto {

    @PrimaryGeneratedColumn('uuid')
    tipo_id:string;

    @Column('text')
    nombre:string;

    @Column('text',{
        nullable:true
    })
    desc:string;
    
    @Column('numeric',{
        default:1
    })
    estado:number;

    @OneToMany(()=>Proyecto,(proyecto)=>proyecto.tipo_proyecto)
    proyecto:Proyecto;
}
