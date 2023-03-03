import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './entities/tarea.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createTareaDto: CreateTareaDto) {
    try {
      const tarea = this.tareaRepository.create(createTareaDto);
      await this.tareaRepository.save(tarea);
      return 'La tarea fue registrada con exito';
    } catch (error) {
      this.showError(error);
    }
  }

  async findAll() {
    const tareas = await this.tareaRepository.find();
    return tareas;
  }

  async findOne(id: string) {
    const tarea = await this.tareaRepository.findOneBy({ tarea_id: id });
    if (!tarea) {
      throw new NotFoundException('La tarea no existe');
    }
    return tarea;
  }

  async update(id: string, updateTareaDto: UpdateTareaDto) {
    try {
      const { estado } = await this.findOne(id);
      if (estado != 1) {
        throw new BadRequestException(
          'La tarea no puede ser modificada, no esta activa',
        );
      }
      const tarea = await this.tareaRepository.preload({
        tarea_id: id,
        ...updateTareaDto,
      });
      if (!tarea) {
        throw new NotFoundException('La tarea no existe');
      }
      await this.tareaRepository.save(tarea);
      return `La tarea fue modificada con exito`;
    } catch (error) {
      this.showError(error);
    }
  }
  async remove(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 1) {
      throw new BadRequestException(
        'La tarea no puede ser eliminada, no esta activa',
      );
    }
    await this.dataSource.createQueryBuilder()
    .update(Tarea)
    .set({
      estado:0,
      eliminado_en: new Date()
    })
    .where('tarea_id=:id',{id})
    .execute()
    return `La tarea fue eliminada con exito`;
  }

  async restore(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 0) {
      throw new BadRequestException(
        'La tarea no puede ser restaurada, no esta inactiva',
      );
    }
    await this.dataSource.createQueryBuilder()
    .update(Tarea)
    .set({
      estado:1,
      eliminado_en: null
    })
    .where('tarea_id=:id',{id})
    .execute()
    return `La tarea fue restaurada con exito`;
  }

  async lock(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 1) {
      throw new BadRequestException(
        'La tarea no puede ser completada, no esta activa',
      );
    }
    await this.dataSource.createQueryBuilder()
    .update(Tarea)
    .set({
      estado:2,
      completado_en: new Date()
    })
    .where('tarea_id=:id',{id})
    .execute()
    return `La tarea fue completada con exito`;
  }

  private showError(error: any) {
    throw new InternalServerErrorException(error);
  }
}
