import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contacto } from 'src/contactos/entities/contacto.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateInstitucioneDto } from './dto/create-institucione.dto';
import { UpdateInstitucioneDto } from './dto/update-institucione.dto';
import { Institucion } from './entities/institucion.entity';

@Injectable()
export class InstitucionesService {
  constructor(
    @InjectRepository(Institucion)
    private readonly institucionRepository: Repository<Institucion>,
    @InjectRepository(Contacto)
    private readonly contactoRepository: Repository<Contacto>,
    private readonly dataSource:DataSource
  ) {}

  async create(createInstitucioneDto: CreateInstitucioneDto) {
    try {
      console.log(createInstitucioneDto);
      const { email, direccion, telefono, ...institucionData } =
        createInstitucioneDto;
      const institucion = this.institucionRepository.create({
        contacto: this.contactoRepository.create({
          email,
          direccion,
          telefono,
        }),
        ...institucionData,
      });
      await this.institucionRepository.save(institucion);
      return {msg:'La institucion fue creada con exito'};
    } catch (error) {
      this.showError(error);
    }
  }

  async findAll() {
    const instituciones = await this.institucionRepository.find();
    return instituciones;
  }

  async findOne(id: string) {
    const institucion = await this.institucionRepository.findOneBy({institucion_id:id});
    if(!institucion){
      throw new BadRequestException('La institucion no existe')
    }
    return institucion;
  }

  async update(id: string, updateInstitucioneDto: UpdateInstitucioneDto) {
    try {
      const { email, direccion, telefono, ...toUpdate } = updateInstitucioneDto;
      const institucion = await this.institucionRepository.preload({
        institucion_id: id,
        ...toUpdate,
      });
      await this.institucionRepository.save(institucion);
      const InstitucionData = await this.findOne(id);
      const {contacto} = InstitucionData;
      const contactoData = this.contactoRepository.create({contacto_id:contacto.contacto_id, email,direccion,telefono})
      await this. contactoRepository.save(contactoData);
      return {msg:'La institucion fue modificada'};
    } catch (error) {
      this.showError(error)
    }
  }

  async remove(id: string) {
    await this.dataSource.createQueryBuilder()
    .update(Institucion)
    .set({estado:0})
    .where('institucion_id=:id',{id})
    .execute()
    return {msg:'La institucion fue eliminada con exito'};
  }

  async restore(id: string) {
    await this.dataSource.createQueryBuilder()
    .update(Institucion)
    .set({estado:1})
    .where('institucion_id=:id',{id})
    .execute()
    return {msg:'La institucion fue restaurada con exito'};
  }

  private showError(error: any) {
    if(error.code === '23505'){
      throw new BadRequestException({error:error.detail, code:error.code})
    }
    throw new InternalServerErrorException(error)
  }
}
