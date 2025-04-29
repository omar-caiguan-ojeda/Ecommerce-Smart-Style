import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    // Verificar si la categoría existe
    const category = await this.prisma.category.findUnique({
      where: { id: createProductDto.categoryId }
    });

    if (!category) {
      throw new NotFoundException(`Categoría con ID ${createProductDto.categoryId} no encontrada`);
    }

    return await this.prisma.product.create({
      data: createProductDto,
      include: {
        category: true
      }
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        category: true,
        reviews: true
      }
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: true
      }
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    // Verificar si el producto existe
    await this.findOne(id);

    // Si se está actualizando la categoría, verificar que exista
    if (updateProductDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateProductDto.categoryId }
      });

      if (!category) {
        throw new NotFoundException(`Categoría con ID ${updateProductDto.categoryId} no encontrada`);
      }
    }

    return await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        category: true
      }
    });
  }

  async remove(id: string) {
    // Verificar si el producto existe
    await this.findOne(id);

    return await this.prisma.product.delete({
      where: { id }
    });
  }

  // Métodos adicionales

  async findByCategory(categoryId: number) {
    return await this.prisma.product.findMany({
      where: {
        categoryId
      },
      include: {
        category: true,
        reviews: true
      }
    });
  }

  async search(query: string) {
    return await this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        category: true,
        reviews: true
      }
    });
  }
}
