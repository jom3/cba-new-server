import { Module } from '@nestjs/common';
import { TiposProyectosService } from './tipos-proyectos.service';
import { TiposProyectosController } from './tipos-proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposProyecto } from './entities/tipos-proyecto.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([TiposProyecto,Proyecto])
  ],
  controllers: [TiposProyectosController],
  providers: [TiposProyectosService]
})
export class TiposProyectosModule {}
