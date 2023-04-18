import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateEgresoDto } from './dto/create-egreso.dto';
import { UpdateEgresoDto } from './dto/update-egreso.dto';
import { Egreso } from './entities/egreso.entity';

@Injectable()
export class EgresosService {
  constructor(
    @InjectRepository(Egreso)
    private readonly egresoRepository: Repository<Egreso>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createEgresoDto: CreateEgresoDto) {
    try {
      const {persona_id,proyecto_id,...toCreate} = createEgresoDto
      const egreso = this.egresoRepository.create({
        persona:{persona_id},
        proyecto:{proyecto_id},
        ...toCreate
      });
      await this.egresoRepository.save(egreso);
      return {msg:'El nuevo egreso fue registrado con exito'};
    } catch (error) {
      this.showError(error);
    }
  }

  async findAll() {
    const egresos = await this.egresoRepository.find();
    return egresos;
  }

  async findAllByProyecto(id:string) {
    const ingresos = await this.egresoRepository.find({where:{proyecto:{proyecto_id:id}}});
    return ingresos;
  }

  async findOne(id: string) {
    const egreso = await this.egresoRepository.findOneBy({ egreso_id: id });
    if (!egreso) {
      throw new NotFoundException('No existe el egreso');
    }
    return egreso;
  }

  async update(id: string, updateEgresoDto: UpdateEgresoDto) {
    try {
      const { estado } = await this.findOne(id);
      if (estado != 1) {
        throw new BadRequestException(
          'El egreso no puede ser modificado, esta bloqueado',
        );
      }
      const egreso = await this.egresoRepository.preload({
        egreso_id: id,
        ...updateEgresoDto,
      });
      if (!egreso) {
        throw new NotFoundException('No existe un egreso con ese codigo');
      }
      await this.egresoRepository.save(egreso);
      return {msg:`El egreso fue modificado con exito`};
    } catch (error) {
      this.showError(error);
    }
  }

  async remove(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 1) {
      throw new BadRequestException(
        'El egreso no puede ser eliminado, esta bloqueado',
      );
    }
    await this.egresoRepository.delete({ egreso_id: id });
    return {msg:`El egreso fue eliminado con exito`};
  }

  async lock(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 1) {
      throw new BadRequestException(
        'El egreso no se puede bloquear por segunda vez',
      );
    }
    await this.dataSource.createQueryBuilder()
    .update(Egreso)
    .set({
      estado:2,
      bloqueado_en:new Date()
    }).where('egreso_id=:id',{id})
    .execute()
    return {msg:`El egreso fue bloqueado con exito`};
  }

  private showError(error: any) {
    throw new InternalServerErrorException(error);
  }
}
