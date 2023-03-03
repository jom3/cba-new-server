import { Module } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { IngresosController } from './ingresos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingreso } from './entities/ingreso.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Institucion } from 'src/instituciones/entities/institucion.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Ingreso,Proyecto,Institucion])
  ],
  controllers: [IngresosController],
  providers: [IngresosService]
})
export class IngresosModule {}
