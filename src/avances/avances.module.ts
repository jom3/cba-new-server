import { Module } from '@nestjs/common';
import { AvancesService } from './avances.service';
import { AvancesController } from './avances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avance } from './entities/avance.entity';
import { Tarea } from 'src/tareas/entities/tarea.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Avance,Tarea])
  ],
  controllers: [AvancesController],
  providers: [AvancesService]
})
export class AvancesModule {}
