import { Module } from '@nestjs/common';
import { DetallesService } from './detalles.service';
import { DetallesController } from './detalles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detalle } from './entities/detalle.entity';
import { Servicio } from 'src/servicios/entities/servicio.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Detalle,Servicio])
  ],
  controllers: [DetallesController],
  providers: [DetallesService]
})
export class DetallesModule {}
