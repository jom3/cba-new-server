import { Institucion } from 'src/instituciones/entities/institucion.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingreso {
  @PrimaryGeneratedColumn('uuid')
  ingreso_id: string;

  @Column('text')
  institucion_id: string;

  @Column('text')
  proyecto_id: string;

  @Column('float', {
    default: 0,
  })
  ingreso: number;

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

  @OneToOne(()=>Institucion,(institucion)=>institucion.ingreso,{
    eager:true,
    cascade:true
  })
  @JoinColumn({name:'institucion_id'})
  institucion:Institucion;

  @ManyToOne(()=>Proyecto,(proyecto)=>proyecto.ingreso)
  @JoinColumn({name:'proyecto_id'})
  proyecto:Proyecto;
}
