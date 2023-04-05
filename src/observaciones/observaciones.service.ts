import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateObservacionDto } from './dto/create-observacion.dto';
import { UpdateObservacionDto } from './dto/update-observacion.dto';
import { Observacion } from './entities/observacion.entity';

@Injectable()
export class ObservacionesService {
  constructor(
    @InjectRepository(Observacion)
    private readonly observacionRepository: Repository<Observacion>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createObservacionDto: CreateObservacionDto) {
    try {
      const { proyecto_id, miembro_id, ...toCreate } = createObservacionDto;
      const observacion = this.observacionRepository.create({
        proyecto: { proyecto_id },
        miembro: { miembro_id },
        ...toCreate,
      });
      await this.observacionRepository.save(observacion);
      return { msg: 'La observación fue creada con exito' };
    } catch (error) {
      this.showError(error);
    }
  }

  async findAll() {
    const observaciones = await this.observacionRepository.find();
    return observaciones;
  }

  async findOne(id: string) {
    const observacion = await this.observacionRepository.findOneBy({
      observacion_id: id,
    });
    if (!observacion) {
      throw new NotFoundException('No existe la observación');
    }
    return observacion;
  }

  async update(id: string, updateObservacionDto: UpdateObservacionDto) {
    try {
      const {estado} = await this.findOne(id);
      const observacion = await this.observacionRepository.preload({
        observacion_id: id,
        ...updateObservacionDto,
      });
      if(estado!=1){
        throw new BadRequestException('La observación fue bloqueada y no puede ser modificada')
      }
      await this.observacionRepository.save(observacion);
      return { msg: `La observación fue modificada con exito` };
    } catch (error) {
      this.showError(error);
    }
  }

  async remove(id: string) {
    const {estado} = await this.findOne(id);
    if(estado!=1){
      throw new BadRequestException('La observación fue bloqueada y no puede ser eliminada')
    }
    await this.observacionRepository.delete({observacion_id:id});
    return {msg:`La observación fue removida con exito`};
  }

  async block(id: string) {
    const {estado} = await this.findOne(id);
    if(estado!=1){
      throw new BadRequestException('La observación fue bloqueada')
    }
    await this.dataSource.createQueryBuilder()
    .update(Observacion)
    .set({estado:2})
    .where('observacion_id=:id',{id})
    .execute()
    return {msg:`La observación fue bloqueada con exito`};
  }

  private showError(error: any) {
    console.log(error)
    throw new InternalServerErrorException(error);
  }
}
