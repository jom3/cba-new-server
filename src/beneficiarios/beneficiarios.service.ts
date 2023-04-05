import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectosService } from 'src/proyectos/proyectos.service';
import { DataSource, Repository } from 'typeorm';
import { CreateBeneficiarioDto } from './dto/create-beneficiario.dto';
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto';
import { Beneficiario } from './entities/beneficiario.entity';
import { Proyecto } from 'src/proyectos/entities/proyecto.entity';

@Injectable()
export class BeneficiariosService {

  constructor(
    @InjectRepository(Beneficiario)
    private readonly beneficiarioRepository:Repository<Beneficiario>,
    @InjectRepository(Proyecto)
    private readonly proyectoRepository:Repository<Proyecto>,
    private readonly dataSource:DataSource,
    private readonly proyectoService:ProyectosService
  ){}

  async create(createBeneficiarioDto: CreateBeneficiarioDto, file:Express.Multer.File) {
    const {persona_id, proyecto_id,archivo, ...toCreate} = createBeneficiarioDto
    try {
      const personaExist = await this.beneficiarioRepository.findOneBy({persona:{persona_id}})
      if(personaExist){
        throw new InternalServerErrorException('Ya esta postulado en este proyecto')
      }
      const beneficiario = this.beneficiarioRepository.create({
        archivo:`${file?file.filename:null}`,
        persona:{persona_id},
        proyecto:{proyecto_id},
        ...toCreate
      });
      await this.beneficiarioRepository.save(beneficiario);
      return {msg:'La postulacion fue realizada con exito'};
    } catch (error) {
      this.showError(error)
    }
  }

  async findAll() {
    const beneficiarios = await this.beneficiarioRepository.find();
    return beneficiarios;
  }

  async findAllMe(id:string) {
    const beneficiarios = await this.beneficiarioRepository.find({where:{persona:{persona_id:id}}});
    return beneficiarios;
  }

  async findOne(id: string) {
    const beneficiario = await this.beneficiarioRepository.findOneBy({beneficiario_id:id});
    if(!beneficiario){
      throw new NotFoundException('No existe la postulacion')
    }
    return beneficiario;
  }

  async accept(id: string) {
    const {estado} = await this.proyectoRepository.findOneBy({beneficiario:{beneficiario_id:id}})
    if(estado!=4){
      throw new BadRequestException('El proyecto esta inactivo, no se pueden aceptar mas postulantes')
    }
    await this.dataSource.createQueryBuilder()
    .update(Beneficiario)
    .set({
      estado:1,
      aceptado_en:new Date(),
      rechazado_en:null
    })
    .where('beneficiario_id=:id',{id})
    .execute()
    return {msg:`El postulante fue aceptado como beneficiario en el proyecto`};
  }

  async deny(id: string) {
    const {estado} = await this.proyectoRepository.findOneBy({beneficiario:{beneficiario_id:id}})
    if(estado!=4){
      throw new BadRequestException('El proyecto esta inactivo, no se pueden rechazar mas postulantes')
    }
    await this.dataSource.createQueryBuilder()
    .update(Beneficiario)
    .set({
      estado:0,
      aceptado_en:null,
      rechazado_en:new Date()
    })
    .where('beneficiario_id=:id',{id})
    .execute()
    return {msg:`El postulante fue rechazado como beneficiario en el proyecto`};
  }

  private showError(error:any){
    throw new InternalServerErrorException(error)
  }
}
