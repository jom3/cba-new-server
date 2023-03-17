import { Module } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/personas/entities/persona.entity';
import { Proyecto } from './entities/proyecto.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';
import { Institucion } from 'src/instituciones/entities/institucion.entity';
import { TiposProyecto } from 'src/tipos-proyectos/entities/tipos-proyecto.entity';
import { Ingreso } from 'src/ingresos/entities/ingreso.entity';
import { Tarea } from 'src/tareas/entities/tarea.entity';
import { Miembro } from 'src/miembros/entities/miembro.entity';
import { Beneficiario } from 'src/beneficiarios/entities/beneficiario.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Proyecto,Institucion,Persona,Producto,Servicio,TiposProyecto,Ingreso,Tarea,Miembro,Beneficiario])
  ],
  controllers: [ProyectosController],
  providers: [ProyectosService],
})
export class ProyectosModule {}
