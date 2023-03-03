import { Module } from '@nestjs/common';
import { BeneficiariosService } from './beneficiarios.service';
import { BeneficiariosController } from './beneficiarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficiario } from './entities/beneficiario.entity';
import { ProyectosService } from 'src/proyectos/proyectos.service';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Beneficiario,Proyecto])
  ],
  controllers: [BeneficiariosController],
  providers: [BeneficiariosService, ProyectosService]
})
export class BeneficiariosModule {}
