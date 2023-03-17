import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Contacto } from 'src/contactos/entities/contacto.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';
import { Egreso } from 'src/egresos/entities/egreso.entity';
import { Beneficiario } from 'src/beneficiarios/entities/beneficiario.entity';
import { Miembro } from 'src/miembros/entities/miembro.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Persona,Contacto, Auth, Proyecto,Egreso,Beneficiario,Miembro])
  ],
  controllers: [PersonasController],
  providers: [PersonasService]
})
export class PersonasModule {}
