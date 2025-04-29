import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@ApiTags('cart-item')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un ítem de carrito' })
  @ApiResponse({ status: 201, description: 'Ítem de carrito creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemService.create(createCartItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los ítems de carrito' })
  @ApiResponse({ status: 200, description: 'Lista de ítems de carrito' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.cartItemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ítem de carrito por ID' })
  @ApiResponse({ status: 200, description: 'Ítem de carrito encontrado' })
  @ApiResponse({ status: 404, description: 'Ítem de carrito no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findOne(@Param('id') id: string) {
    return this.cartItemService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ítem de carrito' })
  @ApiResponse({ status: 200, description: 'Ítem de carrito actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ítem de carrito no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
    return this.cartItemService.update(+id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ítem de carrito' })
  @ApiResponse({ status: 200, description: 'Ítem de carrito eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Ítem de carrito no encontrado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  remove(@Param('id') id: string) {
    return this.cartItemService.remove(+id);
  }
}
