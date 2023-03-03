import { Module } from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import { MiembrosController } from './miembros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Miembro } from './entities/miembro.entity';
import { Persona } from 'src/personas/entities/persona.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Miembro, Persona,Proyecto])
  ],
  controllers: [MiembrosController],
  providers: [MiembrosService]
})
export class MiembrosModule {}
