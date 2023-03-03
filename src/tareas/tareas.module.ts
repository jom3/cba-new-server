import { Module } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Egreso } from 'src/egresos/entities/egreso.entity';
import { Avance } from 'src/avances/entities/avance.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tarea,Egreso,Avance])
  ],
  controllers: [TareasController],
  providers: [TareasService]
})
export class TareasModule {}
