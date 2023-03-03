import { Archivo } from 'src/archivos/entities/archivo.entity';
import { Beneficiario } from 'src/beneficiarios/entities/beneficiario.entity';
import { Egreso } from 'src/egresos/entities/egreso.entity';
import { Ingreso } from 'src/ingresos/entities/ingreso.entity';
import { Institucion } from 'src/instituciones/entities/institucion.entity';
import { Miembro } from 'src/miembros/entities/miembro.entity';
import { Observacione } from 'src/observaciones/entities/observacione.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { TiposProyecto } from 'src/tipos-proyectos/entities/tipos-proyecto.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn('uuid')
  proyecto_id: string;

  @Column('text', {
    nullable: false,
    unique:true
  })
  titulo: string;

  @Column('text', {
    nullable: false,
  })
  caracter: string;

  @Column('text', {
    nullable: false,
  })
  justificacion: string;

  @Column('text', {
    nullable: false,
  })
  objetivo: string;

  @Column('numeric', {
    default: 0,
  })
  costo: number;

  @Column('text', {
    nullable: false,
  })
  moneda: string;

  @Column('numeric', {
    default: 2,
  })
  estado: number;

  @Column('date')
  f_inicio: Date;

  @Column('date')
  f_ejecucion: Date;

  @Column('date')
  f_fin: Date;

  @Column('text', {
    nullable: false,
  })
  persona_id: string;

  @Column('text', {
    nullable: true,
  })
  institucion_id: string;

  @Column('text', {
    nullable: true,
  })
  producto_id: string;

  @Column('text', {
    nullable: true,
  })
  servicio_id: string;

  @Column('text', {
    nullable: false,
    unique:false
  })
  tipo_id: string;

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
  eliminado_en: Date;

  @Column('timestamp', {
    nullable: true,
  })
  completado_en: Date;

  @BeforeInsert()
  checkInsert() {
    this.creado_en = new Date();
    // this.f_inicio = new Date(`${this.f_inicio}`)
    // this.f_ejecucion = new Date(`${this.f_ejecucion}`)
    // this.f_fin = new Date(`${this.f_fin}`)
    // console.log(this.f_inicio)
  }

  @BeforeUpdate()
  checkUpdate() {
    this.modificado_en = new Date();
  }

  @ManyToOne(() => Persona, (persona) => persona.proyecto, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @OneToOne(() => Institucion, (institucion) => institucion.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'institucion_id' })
  institucion: Institucion;

  @OneToOne(() => Producto, (producto) => producto.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @OneToOne(() => Servicio, (servicio) => servicio.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'servicio_id' })
  servicio: Servicio;

  @ManyToOne(() => TiposProyecto, (tipo_proyecto) => tipo_proyecto.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  @JoinColumn({ name: 'tipo_id' })
  tipo_proyecto: TiposProyecto;

  @OneToMany(() => Ingreso, (ingreso) => ingreso.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  ingreso: Ingreso;

  @OneToMany(() => Egreso, (egreso) => egreso.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  egreso: Egreso;

  @OneToMany(() => Miembro, (miembro) => miembro.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  miembro: Miembro;

  @OneToMany(() => Observacione, (observacion) => observacion.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  observacion: Observacione;

  @OneToMany(() => Beneficiario, (beneficiario) => beneficiario.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  beneficiario: Beneficiario;

  @OneToMany(() => Archivo, (archivo) => archivo.proyecto, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  archivo: Archivo;
}
