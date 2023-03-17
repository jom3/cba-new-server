import { Module } from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import { MiembrosController } from './miembros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Miembro } from './entities/miembro.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Tarea } from 'src/tareas/entities/tarea.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Miembro, Persona,Proyecto,Tarea])
  ],
  controllers: [MiembrosController],
  providers: [MiembrosService],
  exports:[TypeOrmModule]
})
export class MiembrosModule {}
