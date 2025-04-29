import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('order-item')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un ítem de orden' })
  @ApiResponse({ status: 201, description: 'Ítem de orden creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ítems de orden' })
  @ApiResponse({ status: 200, description: 'Lista de ítems de orden' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ítem de orden por ID' })
  @ApiResponse({ status: 200, description: 'Ítem de orden encontrado' })
  @ApiResponse({ status: 404, description: 'Ítem de orden no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ítem de orden' })
  @ApiResponse({ status: 200, description: 'Ítem de orden actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ítem de orden no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemService.update(+id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ítem de orden' })
  @ApiResponse({ status: 200, description: 'Ítem de orden eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ítem de orden no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}
