import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateAvanceDto } from './dto/create-avance.dto';
import { Avance } from './entities/avance.entity';

@Injectable()
export class AvancesService {

  constructor(
    @InjectRepository(Avance)
    private readonly avanceRepository:Repository<Avance>,
    private readonly dataSource:DataSource
  ){}

  async create(createAvanceDto: CreateAvanceDto) {
    try {
      const avance = this.avanceRepository.create(createAvanceDto);
      await this.avanceRepository.save(avance);
      return {msg:'El avance fue registrado con exito'};
    } catch (error) {
      this.showError(error);
    }
  }

  async findOne(id: string) {
    const avance = await this.avanceRepository.findOneBy({avance_id:id});
    if(!avance){
      throw new NotFoundException('No existe el avance')
    }
    return avance;
  }

  async remove(id: string) {
    const {estado} = await this.findOne(id);
    if(estado!=1){
      throw new BadRequestException('El avance no puede ser eliminado, esta bloqueado')
    }
    await this.avanceRepository.delete({avance_id:id});
    return {msg:`El avance fue eliminado con exito`};
  }

  async lock(id: string) {
    const {estado} = await this.findOne(id);
    if(estado!=1){
      throw new BadRequestException('El avance no puede ser bloqueado dos veces')
    }
    await this.dataSource.createQueryBuilder()
    .update(Avance)
    .set({
      estado:2,
      bloqueado_en: new Date()
    })
    .where('avance_id=:id',{id})
    .execute()
    return {msg:`El avance fue bloqueado con exito`};
  }

  private showError(error:any){
    throw new InternalServerErrorException(error)
  }
}
