import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { BeneficiariosService } from './beneficiarios.service';
import { CreateBeneficiarioDto } from './dto/create-beneficiario.dto';
import { UpdateBeneficiarioDto } from './dto/update-beneficiario.dto';

@Controller('beneficiarios')
export class BeneficiariosController {
  constructor(private readonly beneficiariosService: BeneficiariosService) {}

  @Post('registrarBeneficiario')
  create(@Body() createBeneficiarioDto: CreateBeneficiarioDto) {
    return this.beneficiariosService.create(createBeneficiarioDto);
  }

  @Get('listarBeneficiarios')
  findAll() {
    return this.beneficiariosService.findAll();
  }

  @Get('listarBeneficiario/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.beneficiariosService.findOne(id);
  }

  @Delete('aceptarBeneficiario/:id')
  accept(@Param('id', ParseUUIDPipe) id: string) {
    return this.beneficiariosService.accept(id);
  }

  @Delete('rechazarBeneficiario/:id')
  deny(@Param('id', ParseUUIDPipe) id: string) {
    return this.beneficiariosService.deny(id);
  }

}
