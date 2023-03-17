import { Module } from '@nestjs/common';
import { ObservacionesService } from './observaciones.service';
import { ObservacionesController } from './observaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacion } from './entities/observacion.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Miembro } from 'src/miembros/entities/miembro.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Observacion,Miembro,Proyecto])
  ],
  controllers: [ObservacionesController],
  providers: [ObservacionesService]
})
export class ObservacionesModule {}
