import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn('uuid')
  servicio_id: string;

  @Column('text', {
    nullable: false,
    unique:true
  })
  nombre: string;

  @Column('text', {
    nullable: true,
  })
  desc: string;

  @OneToMany(() => Detalle, (detalle) => detalle.servicio, {
    eager: true,
    cascade: true,
  })
  detalles: Detalle[];

  @Column('numeric', {
    nullable: false,
    default: 1,
  })
  estado: number;

  @OneToOne(()=>Proyecto,(proyecto)=>proyecto.servicio)
  proyecto:Proyecto;
}
