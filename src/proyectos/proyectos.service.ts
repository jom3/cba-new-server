import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Miembro } from 'src/miembros/entities/miembro.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    @InjectRepository(Miembro)
    private readonly miembroRepository: Repository<Miembro>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProyectoDto: CreateProyectoDto) {
    try {
      const {
        tipo_id,
        persona_id,
        producto_id,
        servicio_id,
        institucion_id,
        ...toCreate
      } = createProyectoDto;
      const proyecto = this.proyectoRepository.create({
        tipo_proyecto: { tipo_id },
        persona: { persona_id },
        producto: producto_id?{ producto_id}:null,
        institucion:institucion_id?{institucion_id}:null,
        servicio:servicio_id?{servicio_id}:null,
        ...toCreate,
      });
      const respuesta = await this.proyectoRepository.save(proyecto);
      const miembro = this.miembroRepository.create({persona:{persona_id}, proyecto:{proyecto_id:respuesta.proyecto_id},rol:'Lider'})
      await this.miembroRepository.save(miembro)
      return { msg: 'El proyecto fue registrado con exito' };
    } catch (error) {
      this.showError(error);
    }
  }

  async findAll() {
    const proyectos = await this.proyectoRepository.find();
    return proyectos;
  }

  async findAllPublicos() {
    const proyectos = await this.proyectoRepository.findBy({caracter:'Publico'});
    return proyectos;
  }

  async findAllMe(id:string) {
    const proyectos = await this.proyectoRepository.find({where:{persona:{persona_id:id}}});
    return proyectos;
  }

  async findAllByPersona(id: string) {
    const proyectos = await this.proyectoRepository.findBy({
      persona: { persona_id: id },
    });
    if (!proyectos) {
      throw new NotFoundException('El usuario no pertenece a ningun proyecto');
    }
    return proyectos;
  }

  async findOne(id: string) {
    const proyecto = await this.proyectoRepository.findOneBy({
      proyecto_id: id,
    });
    if (!proyecto) {
      throw new NotFoundException('No existe ningun proyecto con ese codigo');
    }
    return proyecto;
  }

  async update(id: string, updateProyectoDto: UpdateProyectoDto) {
    console.log(updateProyectoDto)
    try {
      const { estado } = await this.findOne(id);
      if (estado != 1) {
        throw new BadRequestException(
          'El proyecto no esta activo, no puede ser modificado',
        );
      }
      const proyecto = await this.proyectoRepository.preload({
        proyecto_id: id,
        ...updateProyectoDto,
      });
      if (!proyecto) {
        throw new NotFoundException(
          'No se puede modificar el proyecto, hable con un administrador',
        );
      }
      await this.proyectoRepository.save(proyecto);
      return { msg: `El proyecto fue modificado con exito` };
    } catch (error) {
      this.showError(error);
    }
  }

  async remove(id: string) {
    const { estado } = await this.findOne(id);
    if (estado ==3) {
      throw new BadRequestException(
        'El proyecto no puede ser eliminado, esta bloqueado',
      );
    }
    if (estado ==0) {
      throw new BadRequestException(
        'El proyecto no puede ser eliminado, ya fue eliminado previamente',
      );
    }
    await this.dataSource
      .createQueryBuilder()
      .update(Proyecto)
      .set({
        estado: 0,
        eliminado_en: new Date(),
      })
      .where('proyecto_id=:id', { id })
      .execute();
    return { msg: `El proyecto fue eliminado con exito` };
  }

  async restore(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != (0 || 2)) {
      throw new BadRequestException(
        `El proyecto no puede ser restaurado, hable con un administrador`,
      );
    }
    await this.dataSource
      .createQueryBuilder()
      .update(Proyecto)
      .set({
        estado: 1,
        eliminado_en: null,
      })
      .where('proyecto_id=:id', { id })
      .execute();
    return { msg: `El proyecto fue restaurado con exito` };
  }

  async plan(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 1) {
      throw new BadRequestException(
        `El proyecto no puede entrar en ejecucion, el proyecto no esta activo`,
      );
    }
    await this.dataSource
      .createQueryBuilder()
      .update(Proyecto)
      .set({
        estado: 3,
      })
      .where('proyecto_id=:id', { id })
      .execute();
    return { msg: `El proyecto entro en planificación con exito` };
  }

  async eje(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 3) {
      throw new BadRequestException(
        `El proyecto no puede entrar en ejecucion, el proyecto no entro en planificacion`,
      );
    }
    await this.dataSource
      .createQueryBuilder()
      .update(Proyecto)
      .set({
        estado: 4,
      })
      .where('proyecto_id=:id', { id })
      .execute();
    return { msg: `El proyecto entro en ejecución con exito` };
  }


  async lock(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 4) {
      throw new BadRequestException(
        `El proyecto no puede ser bloqueado o completado, el proyecto no esta activo`,
      );
    }
    await this.dataSource
      .createQueryBuilder()
      .update(Proyecto)
      .set({
        estado: 5,
        completado_en: new Date(),
      })
      .where('proyecto_id=:id', { id })
      .execute();
    return { msg: `El proyecto fue bloqueado con exito` };
  }

  async accept(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 3) {
      throw new BadRequestException(
        `El proyecto no puede ser aceptado o rechazado, este ya fue calificado previamente`,
      );
    }
    await this.dataSource
      .createQueryBuilder()
      .update(Proyecto)
      .set({
        estado: 1,
      })
      .where('proyecto_id=:id', { id })
      .execute();
    return { msg: `El proyecto fue aceptado con exito` };
  }
  async deny(id: string) {
    const { estado } = await this.findOne(id);
    if (estado != 3) {
      throw new BadRequestException(
        `El proyecto no puede ser aceptado o rechazado, este ya fue calificado previamente`,
      );
    }
    await this.dataSource
      .createQueryBuilder()
      .update(Proyecto)
      .set({
        estado: 0,
      })
      .where('proyecto_id=:id', { id })
      .execute();
    return { msg: `El proyecto fue rechazado con exito` };
  }

  private showError(error: any) {
    console.log(error);
    throw new InternalServerErrorException(error);
  }
}
