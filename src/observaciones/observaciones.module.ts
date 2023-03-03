import { Module } from '@nestjs/common';
import { ObservacionesService } from './observaciones.service';
import { ObservacionesController } from './observaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Observacione } from './entities/observacione.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Observacione])
  ],
  controllers: [ObservacionesController],
  providers: [ObservacionesService]
})
export class ObservacionesModule {}
