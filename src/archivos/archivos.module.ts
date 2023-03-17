import { Module } from '@nestjs/common';
import { ArchivosService } from './archivos.service';
import { ArchivosController } from './archivos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Archivo } from './entities/archivo.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { ProyectosService } from 'src/proyectos/proyectos.service';
import { Miembro } from 'src/miembros/entities/miembro.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Archivo,Proyecto,Miembro])
  ],
  controllers: [ArchivosController],
  providers: [ArchivosService, ProyectosService]
})
export class ArchivosModule {}
