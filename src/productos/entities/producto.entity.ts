import { Inventario } from 'src/inventarios/entities/inventario.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import {
    BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  producto_id: string;

  @Column('text', {
    nullable: false,
    unique: true,
  })
  nombre: string;

  @Column('text', {
    nullable: true,
  })
  desc: string;

  @Column('text', {
    nullable: false,
  })
  modelo: string;

  @Column('text', {
    nullable: false,
    default: 'Producto',
  })
  categoria: string;

  @OneToMany(() => Inventario, (inventario) => inventario.producto, {
    cascade: true,
    eager: true,
    nullable: false,
  })
  inventario: Inventario;

  @Column('float', {
    nullable: false,
    default: 0,
  })
  precio: number;

  @Column('text', {
    nullable: false,
    default: 'Bolivianos',
  })
  moneda: string;

  @Column('numeric', {
    nullable: false,
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
  eliminado_en: Date;

  @OneToOne(()=>Proyecto,(proyecto)=>proyecto.producto)
  proyecto:Proyecto;

  @BeforeInsert()
  checkInsert(){
    this.creado_en = new Date()
  }

  @BeforeUpdate()
  checkUpdate(){
    this.modificado_en = new Date();
  }
}
