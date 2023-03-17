import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Egreso } from 'src/egresos/entities/egreso.entity';
import { Avance } from 'src/avances/entities/avance.entity';
import { Miembro } from 'src/miembros/entities/miembro.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tarea,Proyecto,Miembro,Egreso,Avance])
  ],
  controllers: [TareasController],
  providers: [TareasService]
})
export class TareasModule {}
