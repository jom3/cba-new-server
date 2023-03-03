import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Contacto } from 'src/contactos/entities/contacto.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Egreso } from 'src/egresos/entities/egreso.entity';
import { Observacione } from 'src/observaciones/entities/observacione.entity';
import { Beneficiario } from 'src/beneficiarios/entities/beneficiario.entity';

@Entity()
export class Persona {
  @PrimaryGeneratedColumn('uuid')
  persona_id: string;

  @Column('text')
  nombre_completo: string;

  @Column('text',{
    default:'Usuario'
  })
  rol: string;

  @Column('text', {
    nullable: true,
  })
  foto: string;

  @Column('date', {
    nullable: false,
  })
  fnac: Date;

  @Column('text', {
    nullable: true,
  })
  ci: string;

  @OneToOne(() => Contacto, contacto=>contacto.persona, { cascade: true, eager: true })
  @JoinColumn({ name: 'contacto_id' })
  contacto: Contacto;

  @Column('numeric', {
    default: 1,
  })
  estado: number;

  @OneToMany(()=>Proyecto, (proyecto)=>proyecto.persona)
  proyecto:Proyecto

  @OneToMany(()=>Egreso, (egreso)=>egreso.persona)
  egreso:Egreso

  @OneToMany(()=>Observacione,(observacion)=>observacion.persona)
  observacion:Observacione

  @OneToMany(()=>Beneficiario,(beneficiario)=>beneficiario.persona)
  beneficiario:Beneficiario
}
