import { Persona } from "src/personas/entities/persona.entity";
import { Proyecto } from "src/proyectos/entities/proyecto.entity";
import { Tarea } from "src/tareas/entities/tarea.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Egreso {
  @PrimaryGeneratedColumn('uuid')
  egreso_id: string;

  @Column('float', {
    default: 0,
  })
  egreso: number;

  @Column('float', {
    default: 0,
  })
  cambio: number;

  @Column('text')
  divisa: string;

  @Column('text')
  comprobante: string;

  @Column('numeric', {
    default: 1,
  })
  estado: number;

  @Column('timestamp', {
    nullable: true,
  })
  creado_en: Date;

  @Column('timestamp', {
    nullable: true,
  })
  modificado_en: Date;

  @Column('timestamp', {
    nullable: true,
  })
  bloqueado_en: Date;

  @ManyToOne(()=>Persona,(persona)=>persona.egreso,{
    eager:true,
    cascade:true
  })
  @JoinColumn({name:'persona_id'})
  persona:Persona;
  
  @ManyToOne(()=>Proyecto,(proyecto)=>proyecto.egreso)
  @JoinColumn({name:'proyecto_id'})
  proyecto:Proyecto;
}
