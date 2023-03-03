import { Servicio } from 'src/servicios/entities/servicio.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Detalle{
  @PrimaryGeneratedColumn('uuid')
  detalle_id: string;

  @Column('text', {
    nullable: false,
  })
  detalle: string;

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

  @Column('numeric',{
    default:1
  })
  estado:number;

  @Column('text', {
    nullable: false,
  })
  servicio_id:string;

  @Column('timestamp', {
    nullable: true,
  })
  creado_en:Date;

  @Column('timestamp', {
    nullable: true
  })
  modificado_en:Date;

  @Column('timestamp', {
    nullable: true
  })
  eliminado_en:Date;

  @Column('timestamp', {
    nullable: true
  })
  restaurado_en:Date;

  @Column('timestamp', {
    nullable: true
  })
  bloqueado_en:Date;

  @ManyToOne(() => Servicio, (servicio) => servicio.detalles)
  @JoinColumn({name:'servicio_id'})
  servicio: Servicio;


  @BeforeInsert()
  checkInsert(){
    this.creado_en = new Date()
  }

  @BeforeUpdate()
  checkUpdate(){
    this.modificado_en = new Date();
  }
}
