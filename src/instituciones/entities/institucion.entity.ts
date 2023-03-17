import { Contacto } from 'src/contactos/entities/contacto.entity';
import { Ingreso } from 'src/ingresos/entities/ingreso.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Institucion {
  @PrimaryGeneratedColumn('uuid')
  institucion_id: string;

  @Column('text', {
    nullable: false,
    unique:true
  })
  nombre: string;

  @Column('text', {
    nullable: true,
  })
  desc: string;

  @Column('text', {
    nullable: false,
    default:'Financiador'
  })
  tipo: string;

  @OneToOne(() => Contacto,(contacto)=>contacto.institucion,{
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'contacto_id' })
  contacto: Contacto;

  @Column('text', {
    nullable: false,
    default:1
  })
  estado: number;

  @OneToOne(()=>Proyecto,(proyecto)=>proyecto.institucion)
  proyecto:Proyecto;

  @OneToMany(()=>Ingreso,(ingreso)=>ingreso.institucion)
  ingreso:Ingreso;
}
