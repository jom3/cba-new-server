import { Module } from '@nestjs/common';
import { EgresosService } from './egresos.service';
import { EgresosController } from './egresos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/personas/entities/persona.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Egreso } from './entities/egreso.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Persona, Proyecto, Egreso])
  ],
  controllers: [EgresosController],
  providers: [EgresosService]
})
export class EgresosModule {}
