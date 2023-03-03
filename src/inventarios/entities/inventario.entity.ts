import { Producto } from 'src/productos/entities/producto.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Inventario {
  @PrimaryGeneratedColumn('uuid')
  inventario_id: string;

  @Column('numeric', {
    nullable: false,
    default: 0,
  })
  cantidad: number;

  @Column('text', {
    nullable: false,
  })
  unidad_medida: string;

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

  @Column('text',{
    nullable:false
  })
  producto_id:string;
  
  @ManyToOne(() => Producto, (producto) => producto.inventario)
  @JoinColumn({ name: 'producto_id' })
  producto: Producto;

  @BeforeInsert()
  checkInsert() {
    this.creado_en = new Date();
  }

  @BeforeUpdate()
  checkUpdate() {
    this.modificado_en = new Date();
  }
}
