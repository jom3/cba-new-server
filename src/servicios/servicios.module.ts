import { Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { Detalle } from 'src/detalles/entities/detalle.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Servicio,Detalle,Proyecto])
  ],
  controllers: [ServiciosController],
  providers: [ServiciosService]
})
export class ServiciosModule {}
