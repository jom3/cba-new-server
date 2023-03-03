import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post('registrarTarea')
  create(@Body() createTareaDto: CreateTareaDto) {
    return this.tareasService.create(createTareaDto);
  }

  @Get('listarTareas')
  findAll() {
    return this.tareasService.findAll();
  }

  @Get('listarTarea/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.findOne(id);
  }

  @Patch('modificarTarea/:id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTareaDto: UpdateTareaDto) {
    return this.tareasService.update(id, updateTareaDto);
  }

  @Delete('eliminarTarea/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.remove(id);
  }

  @Delete('eliminarTarea/:id')
  restore(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.restore(id);
  }

  @Delete('eliminarTarea/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.tareasService.lock(id);
  }
}
