import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { AvancesService } from './avances.service';
import { CreateAvanceDto } from './dto/create-avance.dto';
import { UpdateAvanceDto } from './dto/update-avance.dto';

@Controller('avances')
export class AvancesController {
  constructor(private readonly avancesService: AvancesService) {}

  @Post('registrarAvance')
  create(@Body() createAvanceDto: CreateAvanceDto) {
    return this.avancesService.create(createAvanceDto);
  }

  @Get('listarAvance/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.avancesService.findOne(id);
  }

  @Delete('eliminarAvance/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.avancesService.remove(id);
  }

  @Delete('bloquearAvance/:id')
  lock(@Param('id', ParseUUIDPipe) id: string) {
    return this.avancesService.lock(id);
  }
}
