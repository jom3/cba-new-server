import { Module } from '@nestjs/common';
import { InstitucionesService } from './instituciones.service';
import { InstitucionesController } from './instituciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institucion } from './entities/institucion.entity';
import { Contacto } from 'src/contactos/entities/contacto.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Ingreso } from 'src/ingresos/entities/ingreso.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Institucion,Contacto,Proyecto, Ingreso])
  ],
  controllers: [InstitucionesController],
  providers: [InstitucionesService]
})
export class InstitucionesModule {}
