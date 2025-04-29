import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('shipment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('shipment')
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un envío' })
  @ApiResponse({ status: 201, description: 'Envío creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentService.create(createShipmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los envíos' })
  @ApiResponse({ status: 200, description: 'Lista de envíos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.shipmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un envío por ID' })
  @ApiResponse({ status: 200, description: 'Envío encontrado' })
  @ApiResponse({ status: 404, description: 'Envío no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.shipmentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un envío' })
  @ApiResponse({ status: 200, description: 'Envío actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Envío no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(@Param('id') id: string, @Body() updateShipmentDto: UpdateShipmentDto) {
    return this.shipmentService.update(+id, updateShipmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un envío' })
  @ApiResponse({ status: 200, description: 'Envío eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Envío no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string) {
    return this.shipmentService.remove(+id);
  }
}
